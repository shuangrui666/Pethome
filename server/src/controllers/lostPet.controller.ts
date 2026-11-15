import { Request, Response } from 'express';
import LostPet from '../models/LostPet.model';
import Pet from '../models/Pet.model';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth.middleware';
import mongoose from 'mongoose';

// 报告走失宠物
export const reportLostPet = async (req: AuthRequest, res: Response) => {
  try {
    const {
      petName,
      species,
      breed,
      gender,
      age,
      color,
      features,
      lostTime,
      lostAddress,
      lostCity,
      lostDistrict,
      contactPhone,
      contactWechat,
      reward
    } = req.body;

    // 验证必填字段
    if (!petName || !species || !breed || !color || !lostTime || !lostAddress || !contactPhone) {
      return res.status(400).json({
        success: false,
        message: '请填写所有必填字段'
      });
    }

    // 创建走失记录
    const lostPet = new LostPet({
      petName,
      species,
      breed,
      gender: gender || 'unknown',
      age: age ? Number(age) : undefined,
      color,
      features,
      lostTime: new Date(lostTime),
      lostLocation: {
        type: 'Point',
        address: lostAddress,
        ...(lostCity ? { city: lostCity } : {}),
        ...(lostDistrict ? { district: lostDistrict } : {})
      },
      contactPhone,
      contactWechat,
      reward: reward ? Number(reward) : 0,
      status: 'lost',
      reporterId: req.user!.userId,
      images: req.files ? (req.files as Express.Multer.File[]).map(f => `/uploads/${f.filename}`) : []
    });

    await lostPet.save();

    res.status(201).json({
      success: true,
      message: '走失宠物报告已提交',
      data: lostPet
    });
  } catch (error: any) {
    console.error('报告走失宠物错误:', error);
    res.status(500).json({
      success: false,
      message: '报告走失宠物失败',
      error: error.message
    });
  }
};

// 获取走失宠物列表
export const getLostPets = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (status) query.status = status;

    const lostPets = await LostPet.find(query)
      .populate('reporterId', 'username phone avatar')
      .populate('petId', 'name species breed images')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await LostPet.countDocuments(query);

    res.json({
      success: true,
      data: lostPets,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      }
    });
  } catch (error: any) {
    console.error('获取走失宠物列表错误:', error);
    res.status(500).json({
      success: false,
      message: '获取走失宠物列表失败',
      error: error.message
    });
  }
};

// 获取走失宠物详情
export const getLostPetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 验证 ObjectId 格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: '无效的宠物 ID 格式'
      });
    }

    const lostPet = await LostPet.findById(id)
      .populate('reporterId', 'username phone email avatar')
      .populate('petId', 'name species breed age images description')
      .populate('reports.reporterId', 'username avatar');

    if (!lostPet) {
      return res.status(404).json({
        success: false,
        message: '走失宠物记录不存在'
      });
    }

    // 线索与匹配信息存放在原走失记录的嵌入式数组中。
    const clues = lostPet.reports || [];
    const matches = lostPet.matches || [];

    res.json({
      success: true,
      data: {
        lostPet,
        clues,
        matches
      }
    });
  } catch (error: any) {
    console.error('获取走失宠物详情错误:', error);
    res.status(500).json({
      success: false,
      message: '获取走失宠物详情失败',
      error: error.message
    });
  }
};

// 智能匹配相似的走失宠物
export const matchLostPets = async (_req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: '地理编码服务尚未接入，暂不提供基于距离的匹配结果，避免错误定位造成误导'
  });
};

// 上报线索
export const submitClue = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { description, clueTime, clueLocation } = req.body;

    const lostPet = await LostPet.findById(id);
    if (!lostPet) {
      return res.status(404).json({
        success: false,
        message: '走失宠物记录不存在'
      });
    }

    const images = req.files
      ? (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`)
      : [];

    lostPet.reports.push({
      reporterId: new mongoose.Types.ObjectId(req.user!.userId),
      location: {
        type: 'Point',
        address: clueLocation
      },
      time: new Date(clueTime),
      description,
      images,
      status: 'unverified'
    } as any);

    await lostPet.save();

    res.status(201).json({
      success: true,
      message: '线索上报成功，等待核实',
      data: lostPet.reports[lostPet.reports.length - 1]
    });
  } catch (error: any) {
    console.error('上报线索错误:', error);
    res.status(500).json({
      success: false,
      message: '上报线索失败',
      error: error.message
    });
  }
};

// 更新走失宠物状态
export const updateLostPetStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, foundLocation, foundTime, currentStatus } = req.body;
    const nextStatus = status || (foundLocation || foundTime || currentStatus ? 'found' : undefined);

    if (!nextStatus || !['lost', 'found', 'adopted', 'closed'].includes(nextStatus)) {
      return res.status(400).json({ success: false, message: '无效或缺失的宠物状态' });
    }

    if (foundTime && Number.isNaN(new Date(foundTime).getTime())) {
      return res.status(400).json({ success: false, message: '找到时间格式无效' });
    }

    const lostPet = await LostPet.findOne({
      _id: id,
      reporterId: req.user!.userId
    });

    if (!lostPet) {
      return res.status(404).json({
        success: false,
        message: '走失宠物记录不存在或无权限'
      });
    }

    lostPet.status = nextStatus as any;
    if (notes) lostPet.notes = notes;
    if (nextStatus === 'found') {
      if (foundLocation) lostPet.foundLocation = foundLocation;
      if (foundTime) lostPet.foundTime = new Date(foundTime);
      if (currentStatus) lostPet.currentStatus = currentStatus;
    }

    await lostPet.save();

    // 如果找到宠物，更新关联的宠物状态
    if (nextStatus === 'found' && lostPet.petId) {
      await Pet.findByIdAndUpdate(lostPet.petId, {
        isLost: false,
        foundAt: new Date()
      });
    }

    res.json({
      success: true,
      message: '状态更新成功',
      data: lostPet
    });
  } catch (error: any) {
    console.error('更新状态错误:', error);
    res.status(500).json({
      success: false,
      message: '更新状态失败',
      error: error.message
    });
  }
};

// 获取我的走失宠物报告
export const getMyLostPets = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    // LostPet 模型没有 type 字段；所有该用户创建的走失报告均从 reporterId 查询。
    const query: any = {
      reporterId: req.user!.userId
    };
    if (status) query.status = status;

    const lostPets = await LostPet.find(query)
      .populate('petId', 'name species breed images')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await LostPet.countDocuments(query);

    res.json({
      success: true,
      data: lostPets,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      }
    });
  } catch (error: any) {
    console.error('获取我的走失宠物错误:', error);
    res.status(500).json({
      success: false,
      message: '获取我的走失宠物失败',
      error: error.message
    });
  }
};

// 获取附近的走失宠物
export const getNearbyLostPets = async (_req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    message: '附近搜索需要真实地理编码服务，目前尚未接入'
  });
};

// 删除走失宠物报告
export const deleteLostPet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const lostPet = await LostPet.findOne({
      _id: id,
      reporterId: req.user!.userId
    });

    if (!lostPet) {
      return res.status(404).json({
        success: false,
        message: '走失宠物记录不存在或无权限'
      });
    }

    await LostPet.deleteOne({ _id: id });

    res.json({
      success: true,
      message: '走失宠物报告已删除'
    });
  } catch (error: any) {
    console.error('删除走失宠物错误:', error);
    res.status(500).json({
      success: false,
      message: '删除走失宠物报告失败',
      error: error.message
    });
  }
};
