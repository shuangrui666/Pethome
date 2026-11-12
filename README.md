# PetHome

<div align="center">

![PetHome 封面](/public/cover.png)

<p>
  <img src="https://img.shields.io/badge/项目状态-持续开发中-orange?style=for-the-badge" alt="项目状态：持续开发中">
</p>

> **演示说明：** GitHub 连接的 Netlify 项目目前没有可核验的部署记录，因此暂不提供在线演示入口。请以经现场确认的本地运行结果或后续正式部署地址为准。

<p>
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-BSD-blue?style=for-the-badge" alt="License">
</p>

<p>
  <a href="#项目简介">项目简介</a> •
  <a href="#项目当前状态">项目当前状态</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#贡献指南">贡献指南</a>
</p>

</div>

---

## 项目简介

**PetHome（宠物家园）** 是一个面向宠物主人、领养人和救助参与者的综合宠物服务平台项目。项目围绕宠物领养、医疗服务、流浪动物救助和社区交流等场景组织页面与后端业务代码，并计划逐步完善为可运行、可测试、可维护的智能宠物服务平台。

### PetHome 智能宠物生态系统总体架构（未来目标架构）

> <strong>未来目标架构：</strong> 下图展示 PetHome 计划逐步建设的“智能项圈 + 物联网数据平台 + Web 平台 + AI 智能辅助”整体方向。图中模块均为规划内容，不代表相关硬件、数据链路或功能已经实现或上线。

```mermaid
flowchart TB
    A["PetHome 智能宠物生态系统"]

    subgraph COLLAR["宠物智能项圈（未来硬件）"]
        B1["GPS / GNSS 定位"]
        B2["IMU / 加速度计"]
        B3["温度与经验证的健康传感器"]
        B4["可控触觉反馈模块"]
        B5["手动启停 / 强度限制 / 定时停止"]
        B4 --> B5
    end

    C["无线通信与安全数据传输"]

    subgraph BACKEND["PetHome 后端与物联网平台"]
        D1["设备注册与宠物绑定"]
        D2["数据接收、校验与存储"]
        D3["账户身份、家庭角色与访问权限"]
        D4["电子围栏规则与越界判断"]
        D5["通知、走失事件与线索管理"]
        D6["触觉反馈指令校验与设备状态记录"]
    end

    subgraph WEB["PetHome 网页平台（未来目标功能）"]
        E1["实时位置、最后定位与历史轨迹"]
        E2["智能电子围栏 / 安全区域设置"]
        E3["防走失提醒与走失事件发布"]
        E4["社区协同寻宠 / 附近目击线索"]
        E5["多宠物档案与统一管理"]
        E6["家庭成员共享与分级权限"]
        E7["健康数据看板与活动趋势"]
        E8["宠物健康档案"]
        E9["项圈舒适护理控制入口"]
    end

    subgraph AI["AI 智能辅助（需真实数据训练与评估）"]
        F1["行为模式识别"]
        F2["个体活动趋势分析"]
        F3["异常活动变化辅助提醒"]
        F4["走失图片与线索辅助匹配"]
        F5["个性化养宠建议"]
    end

    A --> COLLAR
    B1 --> C
    B2 --> C
    B3 --> C
    B5 --> C
    C --> BACKEND
    BACKEND --> WEB
    BACKEND --> AI
    AI --> WEB
    E2 --> D4
    D4 --> D5
    E3 --> D5
    E4 --> D5
    E5 --> D3
    E6 --> D3
    E9 --> D6
    D6 -. "经授权的受限控制指令" .-> B4

    classDef planned fill:#eaf2ff,stroke:#477ac3,color:#17365d
    classDef platform fill:#e8f5ed,stroke:#38865a,color:#174b2c
    classDef aiNode fill:#f3eaff,stroke:#8554b5,color:#43236b
    class B1,B2,B3,B4,B5,C,D1,D2,D3,D4,D5,D6 planned
    class E1,E2,E3,E4,E5,E6,E7,E8,E9 platform
    class F1,F2,F3,F4,F5 aiNode
```

**数据链路说明：** 项圈传感器采集的数据需要经过通信链路传输至后端，再由后端按权限存储和提供给网页及 AI 服务。GPS 模块本身不会自动把位置发送到网页；实际通信方式、设备协议、数据安全和传感器准确性仍需后续设计与验证。

### 业务模块概览

为避免把页面数量误认为功能完成度，项目按业务方向归类展示：

| 业务方向 | 涵盖模块（以仓库页面/代码目录为线索） | 当前说明 |
|---|---|---|
| 核心业务方向 | 宠物领养、宠物医疗、流浪动物救助/走失寻回、社区交流 | 仓库包含相关页面或业务代码；各业务流程是否完整联调仍需逐项验证 |
| 扩展服务方向 | 宠物幼儿园、宠物店铺、同城约伴、宠物服务/训练、资助、宠物医药、防走失提醒 | 仓库包含相应页面或模块代码；不据此宣称所有服务已上线 |
| 平台基础能力 | 登录注册、个人资料、宠物档案、订单/预约等 | 以实际接口联调和运行测试结果为准 |

### AI 智能分析架构图（未来目标架构）

> **未来目标架构：** 本图展示 PetHome 未来可能采用的 AI 数据处理与分析流程。当前仓库中已有的规则逻辑、页面或接口，不等于已经具备经过训练、验证和部署的机器学习模型；图中模型能力均需后续研发与评估。

```mermaid
flowchart TB
    subgraph INPUT["第一阶段：数据输入"]
        I1["项圈 IMU / 加速度数据"]
        I2["定位与活动记录"]
        I3["经验证的健康 / 环境传感器数据"]
        I4["主人主动记录：食欲 / 精神状态 / 日常观察"]
    end

    subgraph PREP["第二阶段：数据预处理"]
        P1["设备与宠物身份关联"]
        P2["时间戳对齐 / 采样频率检查"]
        P3["缺失值、噪声与异常值处理"]
        P4["数据标准化与质量标记"]
        P1 --> P2 --> P3 --> P4
    end

    subgraph FEATURE["第三阶段：特征提取"]
        F1["活动强度与持续时间"]
        F2["静止 / 行走 / 奔跑等时序特征"]
        F3["日常活动与休息节律"]
        F4["个体历史基线与变化幅度"]
    end

    subgraph MODEL["第四阶段：分析与模型"]
        R1["基础规则与阈值判断"]
        M1["行为分类模型：需标注数据训练"]
        M2["个体趋势 / 异常变化分析"]
        M3["个性化建议生成与安全约束"]
        M1 --> M2 --> M3
    end

    subgraph OUTPUT["第五阶段：结果输出"]
        O1["行为统计：活动 / 休息趋势"]
        O2["异常变化提示：说明依据与时间范围"]
        O3["个性化养宠建议：供主人参考"]
        O4["健康档案与阶段报告"]
        O5["必要时建议咨询兽医"]
    end

    INPUT --> PREP
    PREP --> FEATURE
    FEATURE --> R1
    FEATURE --> M1
    FEATURE --> M2
    R1 --> O2
    M2 --> O1
    M2 --> O2
    M3 --> O3
    M2 --> O4
    M3 --> O4
    O2 --> O5

    EVAL["模型评估与持续改进：标注质量 / 准确率与召回率 / 误报漏报 / 不同宠物与场景验证"]
    M1 -.-> EVAL
    M2 -.-> EVAL
    EVAL -. "评估通过后再迭代" .-> M1

    classDef input fill:#eaf2ff,stroke:#477ac3,color:#17365d
    classDef prep fill:#e8f5ed,stroke:#38865a,color:#174b2c
    classDef model fill:#f3eaff,stroke:#8554b5,color:#43236b
    classDef output fill:#fff3df,stroke:#c28a35,color:#65420f
    class I1,I2,I3,I4 input
    class P1,P2,P3,P4,F1,F2,F3,F4 prep
    class R1,M1,M2,M3,EVAL model
    class O1,O2,O3,O4,O5 output
```

**研发原则与边界：**

1. **先有可靠数据，再谈模型。** 先确认传感器类型、佩戴位置、采样频率、时间戳和数据质量；不完整或不可靠的数据不能直接用于训练和判断。
2. **建立行为标签。** 行走、奔跑、休息等行为需要通过规范采集和人工核验形成标注数据，并按宠物个体、场景和时间划分训练集与测试集，避免数据泄漏。
3. **规则提醒不等于机器学习。** 初期可以用透明的阈值或规则做基础提醒；只有在拥有足够且有代表性的标注数据、完成训练与独立评估后，才称为机器学习行为识别模型。
4. **异常提示不等于疾病诊断。** 模型只能提示相对个体历史基线的变化，并展示数据时间范围、可信程度和可能的误报；涉及健康问题应建议咨询兽医。
5. **个性化建议需要谨慎。** 建议应结合宠物个体档案、主人记录和经验证的数据，并提供解释与关闭入口，不应仅凭单一传感器读数作出高风险建议。
6. **持续评估模型。** 记录准确率、召回率、误报和漏报，并检查不同体型、年龄、品种、佩戴方式及环境下的表现；未达到预设标准前不应作为可靠功能对外承诺。

### 智能项圈数据流图（未来目标数据链路）

> **未来目标数据链路：** 本图描述智能项圈接入 PetHome 后，传感器数据从采集、传输、接收、存储、分析到网页展示的预期流程。当前仓库尚不能据此证明真实项圈、通信链路、设备数据接口或实时看板已经实现。

```mermaid
flowchart TB
    subgraph DEVICE["第一层：宠物智能项圈（设备端）"]
        S1["GPS / GNSS 定位数据"]
        S2["IMU / 加速度与活动数据"]
        S3["温度及其他经验证的健康传感器"]
        S4["设备状态：电量 / 在线状态"]
        MCU["项圈主控与固件"]
        S1 --> MCU
        S2 --> MCU
        S3 --> MCU
        S4 --> MCU
        MCU --> PACK["数据整理、时间戳与设备标识"]
    end

    subgraph NETWORK["第二层：无线通信与数据传输"]
        LINK["蓝牙 / Wi-Fi / 蜂窝网络等通信方式"]
        GATEWAY["手机或网络网关（视设备方案选用）"]
        SECURE["安全传输：设备认证 / 加密"]
        LINK --> GATEWAY
        GATEWAY --> SECURE
    end

    subgraph SERVER["第三层：PetHome 后端服务"]
        API["设备数据接入 API"]
        AUTH["设备身份验证与权限校验"]
        VALID["数据格式、时间戳与有效性检查"]
        QUEUE["数据缓冲 / 消息处理（按规模选用）"]
        API --> AUTH --> VALID --> QUEUE
    end

    subgraph STORAGE["第四层：数据存储"]
        DB1["设备与宠物绑定信息"]
        DB2["位置与活动记录"]
        DB3["健康及环境数据记录"]
        DB4["设备状态与告警记录"]
    end

    subgraph ANALYSIS["第五层：数据处理与智能分析"]
        PROC["数据清洗、单位统一与异常值处理"]
        RULE["规则与阈值提醒"]
        AI["AI 行为模式分析（需真实数据验证）"]
        REPORT["趋势统计与报告生成"]
        PROC --> RULE
        PROC --> AI
        PROC --> REPORT
    end

    subgraph APP["第六层：PetHome 网页 / 移动端展示"]
        MAP["宠物位置地图与历史轨迹"]
        DASH["活动与健康数据看板"]
        ALERT["越界、设备离线或异常变化提醒"]
        FILE["宠物健康档案与趋势报告"]
    end

    PACK --> LINK
    SECURE --> API
    QUEUE --> DB1
    QUEUE --> DB2
    QUEUE --> DB3
    QUEUE --> DB4
    DB1 --> PROC
    DB2 --> PROC
    DB3 --> PROC
    DB4 --> PROC
    RULE --> ALERT
    AI --> DASH
    AI --> ALERT
    REPORT --> FILE
    DB2 --> MAP
    DB3 --> DASH
    DB4 --> ALERT

    classDef device fill:#eaf2ff,stroke:#477ac3,color:#17365d
    classDef server fill:#e8f5ed,stroke:#38865a,color:#174b2c
    classDef analysis fill:#f3eaff,stroke:#8554b5,color:#43236b
    classDef app fill:#fff3df,stroke:#c28a35,color:#65420f
    class S1,S2,S3,S4,MCU,PACK,LINK,GATEWAY,SECURE device
    class API,AUTH,VALID,QUEUE,DB1,DB2,DB3,DB4 server
    class PROC,RULE,AI,REPORT analysis
    class MAP,DASH,ALERT,FILE app
```

**数据流关键说明：**

1. **采集端：** 传感器由项圈主控读取；不同传感器需要分别验证测量精度、采样频率、佩戴位置和功耗。
2. **通信端：** GPS/GNSS 负责获取定位信息，不负责把信息自动发送到网页。设备还需要可用的通信链路；可由手机网关转发，也可按方案使用 Wi-Fi 或蜂窝网络。
3. **后端接入：** 后端需要识别设备身份、检查用户与宠物的绑定关系，并校验数据格式和时间戳，不能接受未经授权的设备数据。
4. **数据存储：** 位置、活动、健康读数和设备状态应按数据类型管理，并保留时间信息；还需设计数据保留、删除和访问权限。
5. **分析处理：** 先进行数据清洗和基础统计，再逐步研究规则提醒与 AI 分析。AI 结论必须经过真实数据评估，不能把简单阈值规则称为机器学习模型。
6. **网页展示：** 网页通过经过授权的后端接口读取数据，并清楚标注数据更新时间、设备离线状态和定位精度等信息。

**异常与降级场景：** 网络中断时，设备是否能够本地缓存并在恢复后补传，取决于硬件存储和固件设计；设备低电量、数据过期、定位失败或传感器异常时，界面应明确提示“暂不可用”或“数据已过期”，不能显示成实时数据。

**健康安全边界：** 项圈温度读数不等于宠物核心体温；活动或健康传感器读数不能替代兽医检查和诊断。涉及心率、呼吸等指标时，必须先验证具体传感器在真实佩戴场景中的准确性。

### 网站功能模块图（现有代码方向与未来规划）

> **阅读说明：** 此图根据仓库中可见的页面路由、API 和后端业务目录归纳。它展示的是项目功能组织方式，不代表每个模块都已完成前后端联调或通过验收。智能项圈、连续健康监测和 AI 分析属于未来规划。

```mermaid
flowchart TB
    U["用户 / 宠物主人 / 领养人 / 救助参与者"]
    U --> A["账户与个人中心"]
    U --> P["宠物管理"]
    U --> B["宠物服务与业务"]
    U --> C["社区互动"]
    U --> F["平台基础能力"]

    subgraph ACCOUNT["账户与个人中心"]
        A1["注册 / 登录"]
        A2["个人资料与隐私设置"]
        A3["通知 / 我的预约 / 我的订单"]
    end
    A --> A1
    A --> A2
    A --> A3

    subgraph PET["宠物管理"]
        P1["我的宠物 / 宠物档案"]
        P2["宠物资料维护"]
        P3["领养申请与记录"]
    end
    P --> P1
    P --> P2
    P --> P3

    subgraph SERVICE["宠物服务与业务"]
        B1["宠物领养"]
        B2["医疗服务与预约"]
        B3["走失发布与寻回"]
        B4["流浪动物救助 / 资助"]
        B5["宠物幼儿园与寄养"]
        B6["宠物店铺与用品"]
        B7["训练 / 专业服务"]
        B8["同城约伴"]
    end
    B --> B1
    B --> B2
    B --> B3
    B --> B4
    B --> B5
    B --> B6
    B --> B7
    B --> B8

    subgraph COMMUNITY["社区互动"]
        C1["动态发布"]
        C2["宠物相关内容交流"]
        C3["社交与互动"]
        C4["寻宠线索协作（规划深化）"]
    end
    C --> C1
    C --> C2
    C --> C3
    C --> C4

    subgraph PLATFORM["平台基础能力"]
        F1["前端页面与交互"]
        F2["业务 API 与后端服务"]
        F3["身份认证与权限控制"]
        F4["数据存储与文件上传"]
        F5["消息 / 实时通信（待逐项验证）"]
    end
    F --> F1
    F --> F2
    F --> F3
    F --> F4
    F --> F5

    subgraph FUTURE["未来扩展：智能项圈与 AI"]
        G1["设备绑定与定位地图"]
        G2["活动趋势与健康数据看板"]
        G3["电子围栏与异常提醒"]
        G4["AI 行为分析与养宠建议"]
    end
    P1 -. "未来扩展" .-> FUTURE

    classDef current fill:#e8f5ed,stroke:#38865a,color:#174b2c
    classDef foundation fill:#eaf2ff,stroke:#477ac3,color:#17365d
    classDef future fill:#f3eaff,stroke:#8554b5,color:#43236b
    class A1,A2,A3,P1,P2,P3,B1,B2,B3,B4,B5,B6,B7,B8,C1,C2,C3 current
    class F1,F2,F3,F4,F5 foundation
    class C4,G1,G2,G3,G4 future
```

**模块说明：**

| 模块分组 | 主要内容 | 当前状态说明 |
|---|---|---|
| 账户与个人中心 | 注册登录、个人资料、通知、预约和订单入口 | 仓库存在相关页面/代码，权限与业务闭环需测试 |
| 宠物管理 | 我的宠物、宠物资料、领养记录 | 仓库存在相关页面和后端模型/接口，需验证实际联通情况 |
| 宠物服务与业务 | 领养、医疗、走失寻回、救助、寄养、店铺、训练、约伴 | 仓库存在对应业务页面或代码，不能据此认定全部上线 |
| 社区互动 | 动态发布、内容交流和社交功能 | 仓库存在社区页面及相关后端代码，互动流程待验收 |
| 平台基础能力 | 前后端 API、认证、数据存储、文件上传和实时通信 | 需要按功能进行接口、权限和运行测试 |
| 智能项圈与 AI | 定位、健康看板、电子围栏、行为分析 | **未来规划，尚未作为真实设备能力上线** |

### PetHome 项目开发路线图（当前基础与未来阶段）

> **路线图定位：** 本图是项目推进计划，不是已完成清单。当前仓库已有前端页面、后端业务代码和项目文档，但正式前端入口、核心业务闭环、部署状态仍需按可复现证据核验；智能项圈硬件、真实设备数据接入和机器学习模型均属于后续阶段。

```mermaid
flowchart TB
    NOW["当前基础：已有 PetHome 前端页面、后端业务代码与规划文档<br/>正式入口、运行质量和业务闭环仍待审计"]

    subgraph PHASE0["阶段 0：工程审计与基线确认"]
        A1["确认正式前端入口与构建方式"]
        A2["核验后端、数据库、API 与权限"]
        A3["梳理 mock 数据、真实数据和未完成模块"]
        A4["建立可复现测试与问题清单"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph PHASE1["阶段 1：网页平台完善"]
        B1["修复核心页面与交互问题"]
        B2["补齐登录、宠物档案和核心业务闭环"]
        B3["完善加载、错误、空状态与权限"]
        B4["完成端到端测试和用户体验检查"]
        B1 --> B2 --> B3 --> B4
    end

    subgraph PHASE2["阶段 2：部署与运行验证"]
        C1["确定生产构建配置与后端部署方案"]
        C2["配置真实服务地址与安全环境变量"]
        C3["完成部署、日志和可用性验证"]
        C4["形成可复现的发布与回滚记录"]
        C1 --> C2 --> C3 --> C4
    end

    subgraph PHASE3["阶段 3：智能项圈原型验证"]
        D1["明确需求、传感器和通信方案"]
        D2["完成桌面原型与供电安全检查"]
        D3["验证 GPS / IMU / 温度等单项采集"]
        D4["记录精度、功耗、佩戴与稳定性"]
        D1 --> D2 --> D3 --> D4
    end

    subgraph PHASE4["阶段 4：真实设备数据接入"]
        E1["设计设备身份、绑定与数据协议"]
        E2["开发设备接入 API 和数据存储"]
        E3["实现设备到后端的安全传输"]
        E4["网页显示真实数据、时间与离线状态"]
        E1 --> E2 --> E3 --> E4
    end

    subgraph PHASE5["阶段 5：AI 模型研发与验证"]
        F1["建立真实数据集与人工标注规范"]
        F2["先建立规则基线与特征处理流程"]
        F3["训练行为识别 / 趋势分析模型"]
        F4["独立测试误报、漏报与不同场景表现"]
        F5["评估通过后小范围试用并持续监控"]
        F1 --> F2 --> F3 --> F4 --> F5
    end

    subgraph PHASE6["阶段 6：生态功能扩展"]
        G1["电子围栏与协同寻宠"]
        G2["健康档案与个性化服务"]
        G3["舒适护理研究与专业服务协作"]
        G4["多宠物、家庭共享与长期优化"]
        G1 --> G2 --> G3 --> G4
    end

    NOW --> PHASE0 --> PHASE1 --> PHASE2 --> PHASE3 --> PHASE4 --> PHASE5 --> PHASE6

    classDef current fill:#fff3df,stroke:#c28a35,color:#65420f
    classDef engineering fill:#eaf2ff,stroke:#477ac3,color:#17365d
    classDef hardware fill:#e8f5ed,stroke:#38865a,color:#174b2c
    classDef ai fill:#f3eaff,stroke:#8554b5,color:#43236b
    class NOW current
    class A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,C4 engineering
    class D1,D2,D3,D4,E1,E2,E3,E4,G1,G2,G3,G4 hardware
    class F1,F2,F3,F4,F5 ai
```

**阶段交付与验收条件：**

| 阶段 | 主要交付物 | 进入下一阶段前的验收条件 |
|---|---|---|
| 当前基础 | 现有代码、仓库结构和规划文档 | 不把目录或页面存在误当成业务已完成 |
| 0. 工程审计 | 正式入口确认、API/数据链路清单、风险与缺陷清单 | 能复现安装、构建和关键服务启动；关键风险有记录 |
| 1. 网页完善 | 稳定的核心页面与业务流程 | 核心操作可端到端验证，权限和异常状态经过测试 |
| 2. 部署验证 | 可访问的测试/正式环境、部署与回滚记录 | 使用真实配置成功部署，核心功能可从目标环境访问 |
| 3. 项圈原型 | 硬件原型、传感器采集记录、测试报告 | 传感器读数、供电、功耗和通信方式经过实测 |
| 4. 数据接入 | 设备绑定、数据 API、数据库记录、网页展示 | 真实设备数据可追踪到网页，时间戳、权限、离线状态正确 |
| 5. AI 验证 | 标注数据集、基线、模型、独立评测报告 | 有足够数据与可复现指标，误报漏报及适用边界明确 |
| 6. 生态扩展 | 围栏、健康档案、护理协作和家庭共享等功能 | 每项功能独立完成安全、隐私、体验和业务验收 |

**执行顺序说明：**

- 先把现有网站审计、修复和部署验证做好，再并行开展项圈硬件可行性研究；不要在网页和后端数据链路尚不可靠时直接承诺完整 IoT 功能。
- 项圈原型阶段先做单传感器、桌面环境和安全测试，再考虑真实宠物佩戴测试；涉及动物使用时应优先考虑舒适性、安全性和专业意见。
- AI 阶段先积累质量合格且获得适当授权的数据，建立规则基线，再决定是否训练模型。没有独立评测结果，不对外宣称模型准确或已经具备疾病预警能力。
- 各阶段允许根据审计结果调整顺序；未达到验收条件的阶段保持“进行中”或“待核验”，不以时间表代替实际证据。

### 项目当前状态

- **代码与界面：** 仓库包含 Next.js 页面、组件及 Express/TypeScript 后端代码。
- **功能状态：** 页面或模块代码存在，不等于业务闭环已完成；接口、数据库和实时通信功能仍需按模块验证。
- **部署状态：** GitHub 连接的 Netlify 项目目前没有可核验的部署记录；在线部署暂不作为已完成成果展示。
- **AI 状态：** RAG、机器学习推荐、健康辅助和计算机视觉均属于后续规划，当前不作为已上线能力宣传。

### 项目特色与目标

- **多场景服务整合：** 以领养、医疗、救助和社区为核心，逐步连接其他宠物服务。
- **位置与资源匹配：** 规划结合位置、宠物特征和服务需求改善资源查找体验；实际接入状态待核验。
- **实时互动：** 仓库包含 Socket.IO 相关依赖和后端代码，端到端实时功能待验证。
- **安全与可维护性：** 持续完善认证授权、数据保护、测试和开发文档。


## PetHome V2.0：AI 智能化升级路线

PetHome 的长期目标是在现有宠物服务平台基础上，逐步建设为具备知识辅助、智能匹配和多模态能力的 AI 智能宠物服务平台。

> **状态说明：以下内容均为未来规划，不代表相关 AI 功能已经开发、接入真实模型或上线。**

### 四个重点方向

1. **AI 养宠知识助手（优先探索）**：采用 RAG（检索增强生成）思路，让回答结合经过筛选的宠物知识资料，并尽可能展示来源和依据。
2. **机器学习推荐与匹配**：探索领养、救助资源、同城约伴和用品推荐；先建立可解释的规则基线，再用合规数据验证机器学习是否有提升。
3. **AI 健康辅助**：帮助整理健康信息、生成就诊摘要和提供科普资料，不进行兽医诊断，不替代专业检查或治疗。
4. **计算机视觉拓展**：探索宠物图片特征提取和走失线索检索；相似度仅作为候选线索，必须由人确认。

### 分阶段建设路线

| 阶段 | 主要工作 | 阶段目标 |
|---|---|---|
| 1. 现有系统核查 | 确认正式前端入口、接口、数据和部署方式 | 形成可复核的系统现状清单 |
| 2. AI 基础准备 | 明确知识来源、隐私边界、模型服务接口和测试方法 | 建立安全、可评估的基础 |
| 3. RAG 知识助手 MVP | 整理知识资料、实现检索与回答原型 | 用测试集评估检索质量、引用和错误回答 |
| 4. 健康辅助与推荐实验 | 增加安全的信息整理能力，建立推荐规则基线和模型实验 | 记录对照指标、失败案例和人工复核 |
| 5. 视觉与全站集成 | 探索图片检索，逐步接入其他业务模块 | 完成独立测试、权限控制和验收 |

详细的 12 个业务模块 AI 设计、公共能力、技术选型和验收清单见 [PetHome V2.0 AI 升级规划](docs/AI_UPGRADE_PLAN.md)。

**技术真实性原则：** 规则匹配不等同于机器学习，静态页面不等同于 AI 功能。只有在代码实现、测试执行且验收证据可查后，才将规划状态更新为已实现或已验收。

### 智能项圈与物联网生态（长期规划）

PetHome 计划在现有宠物服务平台基础上，探索连接智能宠物项圈，逐步形成“宠物智能硬件 + Web 平台 + AI 辅助分析”的产品生态。该方向目前属于产品与技术规划，**尚不代表已有项圈设备、传感器数据链路或相关功能上线**。

规划中的项圈能力包括：

- **定位与防走失**：结合 GNSS/GPS、移动网络通信和网页地图，探索位置查看、历史轨迹、电子围栏及走失模式。定位频率、室内覆盖和网络可用性需要实测。
- **活动与行为记录**：利用三轴加速度计/IMU 记录活动变化，探索步行、奔跑、休息等行为分类，并生成周期报告。
- **健康数据档案**：在传感器适用且经过验证的前提下，探索心率、呼吸等指标的趋势记录；传感器读数不等同于兽医诊断。项圈温度读数也不能直接当作宠物核心体温。
- **环境安全提醒**：结合设备环境温度与天气信息提供高温、低温风险提示，并明确数据来源和适用范围。
- **智能舒适护理**：研究可拆卸、低强度、可手动关闭的触觉反馈模块；按摩或康复用途须经兽医/专业人员评估，不把振动功能宣传为治疗手段。
- **平台协同**：将设备数据与宠物档案、社区寻宠、家庭共享及专业服务预约等现有产品方向逐步连接。

硬件方向的详细设计、传感器边界、通信链路、安全要求和阶段计划见 [智能项圈与物联网生态规划](docs/AI_UPGRADE_PLAN.md#12-智能项圈与物联网生态规划)。

## 项目截图

> 以下图片用于展示仓库已有的界面设计与页面样例。截图不单独证明后端接口、数据库操作或完整业务流程已经通过验收。

<div align="center">

<table>
<tr>
<td align="center">
<h4>🏠 首页</h4>
<p>精美首页展示，功能入口一目了然，快速导航至各个服务模块</p>
<img src="https://github.com/user-attachments/assets/20361164-175c-41ff-bbaa-67b819c0095f" width="280" alt="首页"/>
</td>
<td align="center">
<h4>📝 申请领养</h4>
<p>在线提交领养申请，填写基本信息，等待审核反馈</p>
<img src="https://github.com/user-attachments/assets/882ae3d7-2e17-4883-9875-25efd349ba59" width="280" alt="申请领养"/>
</td>
</tr>

<tr>
<td align="center">
<h4>📢 走失宠物发布</h4>
<p>发布走失宠物信息，上传照片和联系方式，扩大寻找范围</p>
<img src="https://github.com/user-attachments/assets/7fe9ed4c-e20f-4181-8eec-da757b5a9d4c" width="280" alt="走失宠物发布"/>
</td>
<td align="center">
<h4>🔍 走失宠物查询</h4>
<p>查询附近走失宠物信息，提供线索帮助寻找</p>
<img src="https://github.com/user-attachments/assets/61d029b7-4e84-48b8-916c-8cf6fd3d9efe" width="280" alt="走失宠物查询"/>
</td>
</tr>

<tr>
<td align="center">
<h4>⏰ 防走丢提醒</h4>
<p>设置宠物信息提醒，走失时及时接收通知</p>
<img src="https://github.com/user-attachments/assets/f0cb40a0-5bdb-4a17-b16f-9e794fae9cd8" width="280" alt="防走丢提醒"/>
</td>
<td align="center">
<h4>🎓 宠物幼儿园</h4>
<p>宠物寄养服务，专业看护，让宠物安心度假</p>
<img src="https://github.com/user-attachments/assets/46cb4001-e025-4380-8f0a-8985c4e651a1" width="280" alt="宠物幼儿园"/>
</td>
</tr>

<tr>
<td align="center">
<h4>🛍️ 宠物店铺</h4>
<p>在线购物平台，宠物用品一站式采购</p>
<img src="https://github.com/user-attachments/assets/7d62b5f0-c3e5-4331-9045-ada979e3de89" width="280" alt="宠物店铺"/>
</td>
<td align="center">
<h4>🤝 同城约伴</h4>
<p>约附近宠友一起遛弯，宠物社交新方式</p>
<img src="https://github.com/user-attachments/assets/dabc86cf-7f7a-4842-a651-a63ef1e5a154" width="280" alt="同城约伴"/>
</td>
</tr>

<tr>
<td align="center">
<h4>💊 宠物医药</h4>
<p>宠物药品查询，在线预约兽医咨询服务</p>
<img src="https://github.com/user-attachments/assets/9e51e2a1-1adc-4c91-8a51-caab60b942a7" width="280" alt="宠物医药"/>
</td>
<td align="center">
<h4>❤️ 宠物资助</h4>
<p>为流浪动物提供物资援助，传递爱心</p>
<img src="https://github.com/user-attachments/assets/d9ccafb5-3d31-479c-a0fc-e805cada435f" width="280" alt="宠物资助"/>
</td>
</tr>

<tr>
<td align="center">
<h4>🐕 训狗服务</h4>
<p>专业训狗师在线指导，解决养狗难题</p>
<img src="https://github.com/user-attachments/assets/9eece611-a2f4-42b6-8826-ab6255a6e5f4" width="280" alt="训狗服务"/>
</td>
<td align="center">
<h4>💬 养宠社区</h4>
<p>分享养宠经验，与众多宠友交流心得</p>
<img src="https://github.com/user-attachments/assets/7a43d621-c1fc-47c9-91ad-308307a97488" width="280" alt="养宠社区"/>
</td>
</tr>
</table>

</div>

---

## 技术架构

### 前端技术栈

```
├───────────────────────────────────────────────
│                   前端 (Next.js 14)                      │
├───────────────────────────────────────────────────────────┤
│ • React 18          • TypeScript 5                      │
│ • Tailwind CSS      • Radix UI                          │
│ • Axios             • Socket.IO Client                  │
│ • React Bootstrap   • Lucide Icons                      │
└───────────────────────────────────────────────────────────┘
```

### 后端技术栈

```
├───────────────────────────────────────────────
│                  后端 (Node.js + Express)                │
├───────────────────────────────────────────────────────────┤
│ • TypeScript 5      • Express 4                         │
│ • MongoDB + Mongoose 8  • Socket.IO                     │
│ • JWT 认证          • bcrypt 加密                       │
│ • Helmet 安全       • CORS 跨域                         │
│ • Multer 文件上传   • Express Validator                 │
└───────────────────────────────────────────────────────────┘
```

### 当前代码逻辑架构（待运行核验）

```
浏览器用户
   │
   ▼
Next.js 前端页面与组件
   │ HTTP 请求 / Socket.IO（按具体功能核验）
   ▼
Express + TypeScript 后端
   │
   ▼
Mongoose 数据模型
   │
   ▼
MongoDB（连接配置与运行状态待核验）
```

> 这张图描述仓库代码中可识别的技术层次，不代表当前已成功部署或所有接口均已联通。正式前端入口、API 地址、数据库连接和实时通信仍需通过本地运行与测试确认。

### 未来目标架构（规划中）

```
浏览器 / 移动端
      │
      ▼
PetHome Web 前端
      │
      ▼
业务 API 与身份权限层
      ├────────► 数据库与文件存储
      ├────────► 实时消息服务
      └────────► 独立 AI 服务（规划中）
                    ├── RAG 知识检索
                    ├── 推荐与匹配模型
                    └── 宠物图片检索
```

> 未来架构仅表示目标方向。具体云服务、模型供应商、部署拓扑和数据存储方案需经调研与验证后确定。

---

## 项目目录概览

```
Pethome/
├── app/                    # 根目录 Next.js 页面结构（正式入口待核验）
├── components/             # 根目录共享组件
├── src/                    # 根目录源码相关目录
├── client/                 # 另一套 Next.js 前端结构（与根目录存在重复）
├── server/                 # Express + TypeScript 后端
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── middleware/
├── public/                 # 静态资源
├── docs/                   # 项目文档
│   ├── README.md           # 文档导航
│   ├── AI_UPGRADE_PLAN.md  # AI 升级详细规划
│   ├── user/               # 普通用户手册
│   └── developer/          # 开发者技术手册
├── netlify.toml            # 根目录部署配置（策略待核验）
├── client/netlify.toml     # client 部署配置（策略待核验）
├── README.md
└── 项目文档结构图与推进计划.md
```

> **重要说明：** 根目录与 `client/` 均存在前端项目文件，且两处 Netlify 配置策略不同。当前不据此认定正式构建入口，也不删除或合并任一目录。应在完成依赖、导入路径、本地构建和部署验证后再决定是否整合。

---

## 文档入口

- [项目文档中心](docs/README.md)
- [普通用户使用手册](docs/user/USER_MANUAL.md)（框架已建立，内容待实际功能核验）
- [开发者技术手册](docs/developer/DEVELOPER_GUIDE.md)（框架已建立，内容待工程验证）
- [PetHome V2.0 AI 升级详细规划](docs/AI_UPGRADE_PLAN.md)
- [项目文档结构图与推进计划](项目文档结构图与推进计划.md)

---

## 快速开始

### 环境要求

- Node.js >= 18.x
- MongoDB >= 8.x
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/shuangrui666/Pethome.git
cd Pethome
```

2. **安装依赖**
```bash
# 前端
cd client
npm install

# 后端
cd ../server
npm install
```

3. **配置环境变量**

在项目根目录创建 `.env` 文件：

```env
# 数据库
MONGODB_URI=mongodb://localhost:27017/pethome

# JWT
JWT_SECRET=your-secret-key-here

# 端口
PORT=5000
```

4. **启动服务**

```bash
# 后端（终端 1）
cd server
npm run dev

# 前端（终端 2）
cd client
npm run dev
```

5. **访问应用**

打开浏览器访问 `http://localhost:3000`

---

## 功能说明

### 宠物领养
- 浏览附近可领养的宠物
- 在线提交领养申请
- 领养进度追踪

### 宠物医院
- 基于 LBS 的附近医院查询
- 医生在线预约
- 病历管理和查询

### 流浪救助
- 流浪动物上报
- 救助点信息展示
- 捐赠和志愿者报名

### 社区交流
- 养宠经验分享
- 宠物照片分享
- 问答互动

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循 [TypeScript](https://www.typescriptlang.org/) 类型规范
- 使用 [ESLint](https://eslint.org/) 和 [Prettier](https://prettier.io/) 格式化代码
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

---

## 许可证

本项目采用 [BSD 许可证](LICENSE)

---

## 联系方式

- 作者：shuangrui666
- Email: shuangrui666@gitee.com
- GitHub: [@shuangrui666](https://github.com/shuangrui666)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
