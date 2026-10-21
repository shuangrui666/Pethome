'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createLostPet } from '@/src/api/lostPet'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Label } from '@/src/components/ui/label'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { ArrowLeft, Upload, Loader2, LogIn } from 'lucide-react'

export default function CreateLostPetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // 检查登录状态
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      setIsLoggedIn(false)
      setError('请先登录后再发布走失报告')
    } else {
      setIsLoggedIn(true)
    }
    setCheckingAuth(false)
  }, [])

  const [formData, setFormData] = useState({
    petName: '',
    species: 'dog',
    breed: '',
    gender: 'unknown',
    age: '',
    color: '',
    features: '',
    lostTime: '',
    lostLocation: {
      type: 'Point' as const,
      coordinates: [116.4074, 39.9042] as [number, number],
      address: '',
      city: '北京市',
      district: '朝阳区'
    },
    contactPhone: '',
    contactWechat: '',
    reward: ''
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      // Handle nested fields like lostLocation.address
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files)
      
      if (photos.length + newPhotos.length > 5) {
        setError('最多只能上传 5 张照片')
        return
      }

      setPhotos(prev => [...prev, ...newPhotos])
      
      // 创建预览
      const previews = newPhotos.map(file => URL.createObjectURL(file))
      setPhotoPreviews(prev => [...prev, ...previews])
      setError('')
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 再次检查登录状态
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      router.push('/auth')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // 验证必填字段
      if (!formData.petName || !formData.breed || !formData.color ||
          !formData.lostTime || !formData.lostLocation.address || !formData.contactPhone) {
        throw new Error('请填写所有必填字段')
      }

      if (photos.length === 0) {
        throw new Error('请至少上传一张宠物照片')
      }

      // 准备表单数据
      const submitData = new FormData()
      submitData.append('petName', formData.petName)
      submitData.append('species', formData.species)
      submitData.append('breed', formData.breed)
      submitData.append('gender', formData.gender)
      if (formData.age) submitData.append('age', formData.age)
      submitData.append('color', formData.color)
      if (formData.features) submitData.append('features', formData.features)
      submitData.append('lostTime', formData.lostTime)
      submitData.append('lostAddress', formData.lostLocation.address)
      submitData.append('lostCity', formData.lostLocation.city)
      submitData.append('lostDistrict', formData.lostLocation.district)
      submitData.append('contactPhone', formData.contactPhone)
      if (formData.contactWechat) submitData.append('contactWechat', formData.contactWechat)
      if (formData.reward) submitData.append('reward', formData.reward)
      
      // 添加图片
      photos.forEach(photo => {
        submitData.append('images', photo)
      })

      // 调用 API
      await createLostPet(submitData as any)
      
      setSuccess('走失报告已成功提交！感谢您的贡献。')
      
      // 清空表单
      setFormData({
        petName: '',
        species: 'dog',
        breed: '',
        gender: 'unknown',
        age: '',
        color: '',
        features: '',
        lostTime: '',
        lostLocation: {
          type: 'Point' as const,
          coordinates: [116.4074, 39.9042] as [number, number],
          address: '',
          city: '北京市',
          district: '朝阳区'
        },
        contactPhone: '',
        contactWechat: '',
        reward: ''
      })
      setPhotos([])
      setPhotoPreviews([])
      
      // 3 秒后返回列表页
      setTimeout(() => {
        router.push('/lost-found')
      }, 3000)
      
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || '提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={() => router.push('/lost-found')}
          className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回列表</span>
        </button>

        {checkingAuth ? (
          <Card className="shadow-lg border-amber-200">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin" />
              <p className="text-amber-700">正在检查登录状态...</p>
            </CardContent>
          </Card>
        ) : !isLoggedIn ? (
          <Card className="shadow-lg border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-2xl">请先登录</CardTitle>
              <CardDescription className="text-amber-100">
                您需要先登录才能发布走失报告
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-amber-800 mb-6">
                登录后可以发布走失宠物报告，帮助我们更快地找到它
              </p>
              <Button
                onClick={() => router.push('/auth')}
                className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-8"
              >
                <LogIn className="w-5 h-5 mr-2" />
                去登录
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-2xl">发布走失报告</CardTitle>
              <CardDescription className="text-amber-100">
                请填写宠物走失信息，帮助我们尽快找到它
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* 成功/错误消息 */}
              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {/* 宠物基本信息 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-800">宠物基本信息</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">宠物名字 *</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      placeholder="请输入宠物名字"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species">物种 *</Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) => handleInputChange('species', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">狗狗</SelectItem>
                        <SelectItem value="cat">猫咪</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breed">品种 *</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) => handleInputChange('breed', e.target.value)}
                      placeholder="例如：金毛、布偶猫"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">公</SelectItem>
                        <SelectItem value="female">母</SelectItem>
                        <SelectItem value="unknown">未知</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">年龄</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="例如：2 岁"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">毛色 *</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      placeholder="例如：金黄色、白色"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">特征描述</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="请描述宠物的特殊特征，如疤痕、胎记、佩戴的项圈等"
                    rows={3}
                  />
                </div>
              </div>

              {/* 走失信息 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-800">走失信息</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lostTime">走失时间 *</Label>
                    <Input
                      id="lostTime"
                      type="datetime-local"
                      value={formData.lostTime}
                      onChange={(e) => handleInputChange('lostTime', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lostDistrict">走失区域</Label>
                    <Input
                      id="lostDistrict"
                      value={formData.lostLocation.district}
                      onChange={(e) => handleInputChange('lostLocation.district', e.target.value)}
                      placeholder="例如：朝阳区"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lostAddress">详细走失地址 *</Label>
                  <Input
                    id="lostAddress"
                    value={formData.lostLocation.address}
                    onChange={(e) => handleInputChange('lostLocation.address', e.target.value)}
                    placeholder="例如：XX 公园附近"
                    required
                  />
                </div>
              </div>

              {/* 联系方式 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-800">联系方式</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">联系电话 *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="请输入您的联系电话"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactWechat">微信</Label>
                    <Input
                      id="contactWechat"
                      value={formData.contactWechat}
                      onChange={(e) => handleInputChange('contactWechat', e.target.value)}
                      placeholder="请输入您的微信（可选）"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward">悬赏金额（可选）</Label>
                  <Input
                    id="reward"
                    type="number"
                    value={formData.reward}
                    onChange={(e) => handleInputChange('reward', e.target.value)}
                    placeholder="例如：1000"
                  />
                </div>
              </div>

              {/* 照片上传 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-800">宠物照片 *</h3>
                
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-12 h-12 text-amber-500" />
                    <span className="text-amber-700">点击上传照片（最多 5 张）</span>
                    <span className="text-sm text-amber-600">支持 JPG、PNG 格式</span>
                  </label>
                </div>

                {photoPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {photoPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 提交按钮 */}
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    提交中...
                  </>
                ) : (
                  '提交走失报告'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  )
}
