export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🐾 PetHome 宠物家园</h5>
            <p className="text-muted">
              让每只宠物都能找到温暖的家，让每个养宠人都能找到志同道合的朋友。
            </p>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">核心功能</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <a href="/adoption" className="text-muted text-decoration-none">
                  宠物领养
                </a>
              </li>
              <li className="mb-1">
                <a href="/lost-found" className="text-muted text-decoration-none">
                  走失寻回
                </a>
              </li>
              <li className="mb-1">
                <a href="/kindergarten" className="text-muted text-decoration-none">
                  狗狗幼儿园
                </a>
              </li>
              <li className="mb-1">
                <a href="/shop" className="text-muted text-decoration-none">
                  宠物店
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">社区与服务</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <a href="/community" className="text-muted text-decoration-none">
                  养宠社区
                </a>
              </li>
              <li className="mb-1">
                <a href="/medical" className="text-muted text-decoration-none">
                  宠物医疗
                </a>
              </li>
              <li className="mb-1">
                <a href="/training" className="text-muted text-decoration-none">
                  训狗服务
                </a>
              </li>
              <li className="mb-1">
                <a href="/donation" className="text-muted text-decoration-none">
                  捐赠公益
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">联系我们</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-1">📧 客服邮箱：support@pethome.com</li>
              <li className="mb-1">📞 客服电话：400-888-8888</li>
              <li className="mb-1">🕒 服务时间：9:00-18:00</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted mb-0">
              © 2024 PetHome 宠物家园。All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-muted text-decoration-none me-3">
              隐私政策
            </a>
            <a href="#" className="text-muted text-decoration-none me-3">
              服务条款
            </a>
            <a href="#" className="text-muted text-decoration-none">
              帮助中心
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
