import { underphase } from "../../assets/images";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-5 bg-navy-primary px-5 py-8">
      <div className="flex sm:flex-row flex-col gap-5 text-white font-semibold">
        <img src={underphase} alt="Underphase Logo" width={160} />
        <div className="flex flex-row gap-5 text-white font-semibold">
          <button>이용약관</button>
          <button>개인정보처리방침</button>
          <button>저작권 표시</button>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-5 text-gray-dark font-medium">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-gray-normal font-semibold">언더페이즈</h3>
          <div className="text-sm">
            <p>사업자등록번호. 627-04-03076</p>
            <p>통신판매업 신고번호. 2025-부산진-0529</p>
            <p>
              주소. 부산광역시 부산진구 엄광로176, 23동 307호(가야동,
              동의대학교)
            </p>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-gray-normal font-semibold">고객센터</h3>
            <div className="text-sm">
              <p>전화번호. 070-8064-4541</p>
              <p>이메일. help.yojeong@underphase.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-gray-normal font-semibold">운영시간</h3>
            <div className="text-sm">
              <p>월 ~ 금. 09:00 - 18:00(주말, 공휴일 미운영)</p>
              <p>점심시간. 12:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
