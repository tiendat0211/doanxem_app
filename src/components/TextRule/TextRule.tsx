import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import AppText from "../AppText/AppText";
import { unit12, unit16, unit20, unit23 } from "../../utils/appUnit";
import { fontSize14 } from "../../styles/AppFonts";

const RuleText: React.FC = () => {
  const {colorPallet, theme} = useTheme()

  return (
    <View style={styles.container}>
      <AppText
        style={[styles.title,{ color: colorPallet.color_text_blue_1}]}
      >
        1. Quyền lợi người dùng
      </AppText>
      <AppText
        style={[styles.content,{ color : colorPallet.color_text_gray_2}]}
      >
        {` + Được tham gia vào cộng đồng chia sẻ hình ảnh, video,  hài hước,... 
  + Bắt trend cực chất qua những  xịn sò. 
  + Chia sẻ vitamin cười đến với cộng đồng để lan tỏa nguồn năng lượng tích cực tới tất cả mọi người. 
  + Lan truyền tác phẩm của bản thân rộng rãi trên mạng xã hội. 
  + Bạn hoàn toàn có thể đăng tải hình ảnh, video, file gif với nội dung gây cười, hài hước. 
  + Kiểm duyệt bài đăng cá nhân, theo dõi tình trạng bài đăng của mình có đang tiếp cận tốt với mọi người hay không. 
  + Có những phút giây thư giãn thoải mái sau những giờ học hành và làm việc căng thẳng. 
  + Giảm tải những áp lực của cuộc sống, những lo âu muộn phiền bằng những tiếng cười tích cực.
	+ Cập nhật thông tin quanh đời sống một cách nhanh nhất. 
  + Được kết nối cảm xúc với mọi người. 
  + Tải và sử dụng , hình ảnh, video với chất lượng cao.
  + “Like” hoặc “Dislike” thẳng vào  và lên top bằng những câu bình luận chất hơn cả . 
  + Tùy chọn Xóa hoặc giữ bài đăng.`}
      </AppText>
      <AppText
        style={[styles.title,{ color: colorPallet.color_text_blue_1}]}
      >
        2. Chính sách về quyền riêng tư
      </AppText>
      <AppText
        style={[styles.content,{ color : colorPallet.color_text_gray_2}]}
      >
        {` + Không bán dữ liệu cá nhân của người dùng cho các nhà quảng cáo và cũng không chia sẻ thông tin trực tiếp nhận dạng người dùng (chẳng hạn như tên, địa chỉ email hoặc thông tin liên hệ khác) với những đơn vị này trừ khi được bạn cho phép cụ thể.
  + Thông tin cá nhân của người dùng được 'Đoán Xem' bảo vệ `}
      </AppText>
      <AppText
        style={[styles.title,{ color: colorPallet.color_text_blue_1}]}
      >
        3. Chính sách về quyền truy cập và trách nhiệm của chúng tôi
      </AppText>
      <AppText
        style={[styles.content,{ color : colorPallet.color_text_gray_2}]}
      >
        {` + Quyền sử dụng nội dung bạn tạo và chia sẻ.
  + Để chúng tôi cung cấp dịch vụ, bạn cần cấp cho chúng tôi một số quyền pháp lý (gọi là "giấy phép") để sử dụng nội dung đó. Việc này chỉ nhằm mục đích cung cấp và cải thiện sản phẩm cũng như dịch vụ của chúng tôi Chúng tôi có trách nhiệm cung cấp dịch vụ và đảm bảo quyền lợi của người dùng.
  + Chúng tôi, với toàn quyền hạn của mình và vào bất cứ lúc nào được quyền bổ sung, sửa đổi hay xóa bỏ bất kỳ thông tin nào cũng như thay đổi giao diện, sự trình bày, thành phần hoặc chức năng, nội dung của trang web này bao gồm bất kỳ khoản mục nào mà không cần báo trước.
  + Chúng tôi có toàn quyền thay đổi quy định mà không cần báo trước. Với việc tiếp tục sử dụng “Đoán Xem” sau những sửa đổi đó. Người sử dụng mặc nhiên đồng ý chấp hành các sửa đổi trong quy định.
  + Chúng tôi có trách nhiệm phối hợp với cơ quan quản lý nhà nước có thẩm quyền để loại bỏ hoặc ngăn chặn thông tin có nội dung vi phạm quy định của pháp luật.
  + Có quyền cung cấp thông tin cá nhân và thông tin riêng của người dùng có liên quan đến hoạt động khủng bố, tội phạm, vi phạm pháp luật khi có yêu cầu của cơ quan quản lý nhà nước có thẩm quyền.
  + Trong quá trình sử dụng sản phẩm, nếu người dùng vi phạm bất cứ điều khoản nào trong Thỏa thuận cung cấp dịch vụ mạng xã hội này, chúng tôi có toàn quyền chấm dứt, xóa bỏ tài khoản của người dùng mà không cần sự đồng ý của người dùng và không phải chịu bất cứ trách nhiệm nào đối với người dùng.`}
      </AppText>
      <AppText
        style={[styles.title,{ color: colorPallet.color_text_blue_1}]}
      >
        4. Chính sách sử dụng Đối tượng áp dụng
      </AppText>
      <AppText
        style={[styles.content,{ color : colorPallet.color_text_gray_2}]}
      >
        {`+ Tất cả mọi người Không đăng những nội dung mang tính chất miệt thị người khác. 
  + Không xúc phạm tôn giáo, chủng tộc Không đăng tải nội dung mang tính phản động, chính trị, xúc phạm Đảng và Nhà nước Việt Nam Không có những hành động quấy rối, làm phiền người khác Không có bài viết bất hợp pháp, gây hiểu nhầm, phân biệt đối xử hoặc lừa đảo. 
  + Không đăng tải nội dung 18+, phản cảm và lộ liễu Không xâm phạm hoặc vi phạm quyền của người khác, bao gồm quyền sở hữu trí tuệ. 
  + Không chia sẻ mật khẩu, cấp cho người khác quyền truy cập vào tài khoản "Đoán Xem" của bạn hoặc chuyển tài khoản của bạn cho bất kỳ ai khác (mà không được chúng tôi cho phép). 
  + Không cung cấp, chia sẻ thông tin bịa đặt, gây hoang mang trong Nhân dân, kích động bạo lực, tội ác, tệ nạn xã hội, đánh bạc hoặc phục vụ đánh bạc Không cung cấp, chia sẻ thông tin miêu tả tỉ mỉ hành động chém, giết, tai nạn, kinh dị, rùng rợn Không cung cấp, chia sẻ thông tin cổ súy các hủ tục, mê tín, dị đoan, dâm ô, đồi trụy, không phù hợp với thuần phong, mỹ tục của dân tộc
  + Không cung cấp, chia sẻ thông tin giả mạo, thông tin sai sự thật, xuyên tạc, vu khống, xúc phạm uy tín của cơ quan, tổ chức, danh dự, nhân phẩm của cá nhân
  + Bài đăng của bạn sẽ ở trong cơ chế xét duyệt bài đăng của chúng tôi, nếu bạn bài đăng viết vi phạm chính sách, chúng tôi sẽ gửi thông báo tới bạn và không xét duyệt bài đăng đó.`}
      </AppText>
      <AppText
        style={[styles.title,{ color: colorPallet.color_text_blue_1}]}
      >
        5. Chính sách về vi phạm điều khoản sử dụng "Đoán Xem"
      </AppText>
      <AppText
        style={[styles.content,{ color : colorPallet.color_text_gray_2}]}
      >
        {`+ Được quyền xem xét và xóa bài đăng vi phạm chính sách sử dụng “Đoán Xem” được quyền gửi cảnh cáo hoặc chặn hiển thị bài đăng khi bạn vi phạm chính sách của chúng tôi với từng mức độ.
  +Chúng tôi được quyền khiếu nại và xử lý trong trường hợp bạn gây rối, can thiệp và làm gián đoạn dịch vụ của chúng tôi. 
  + Chúng tôi được quyền tạm ngừng hoặc chấm dứt quyền truy cập của bạn nếu bạn vi phạm chính sách sử dụng của chúng tôi. 
  + Trong 24 giờ kể từ khi nhận báo cáo, chúng tôi sẽ tạm ẩn bài viết và gửi thông báo tới người dùng. Nếu bài đăng của người dùng vi phạm chính sách của chúng tôi, chúng tôi sẽ áp dụng các mức xử phạt trong chính sách vi phạm.
  + Bạn sẽ bồi thường cho chúng tôi đối với mọi thủ tục tố tụng của bên thứ ba (bao gồm cả các hoạt động tố tụng của các cơ quan chính phủ) phát sinh hoặc liên quan đến việc bạn sử dụng dịch vụ theo cách trái pháp luật hoặc vi phạm các điều khoản nêu trên. Điều khoản bồi thường này bao gồm mọi trách nhiệm pháp lý hay chi phí phát sinh từ các vụ khiếu nại, tổn thất, thiệt hại, phán quyết, tiền phạt, chi phí kiện tụng và chi phí pháp lý.
  + Hình thức xử phạt 1, khóa tài khoản 10 ngày theo khoản 1 điều này được áp dụng bao gồm nhưng không giới hạn đối với các hành vi sau:
    - Cung cấp đường dẫn đến trang thông tin điện tử có nội dung vi phạm quy định pháp luật. 
    - Tiết lộ bí mật đời tư hoặc bí mật khác khi chưa được sự đồng ý của cá nhân, tổ chức có liên quan trừ trường hợp Pháp luật quy định. Ngoài chịu xử phạt do “Đoán Xem” áp dụng, Người Sử Dụng vi phạm còn chịu trách nhiệm trực tiếp với người bị xâm phạm quyền và Pháp luật. 
    - Đăng tải những thông tin, nội dung mê tín dị đoan Công kích, xuyên tạc, xúc phạm nhân phẩm các Người Sử Dụng khác. 
    - Lôi kéo cộng đồng người dùng tham gia có chủ đích bằng các câu view sai phạm, vi phạm văn hóa đạo đức. 
  + Hình thức xử phạt 2, khóa tài khoản 20 ngày theo khoản 1 điều này được áp dụng bao gồm nhưng không giới hạn đối với các hành vi sau: 
    - Đăng tải thông tin miêu tả tỉ mỉ hành động dâm ô, chém, giết, tai nạn rùng rợn trong các tin, bài, clip, ảnh không phù hợp thuần phong mỹ tục Việt Nam.
    - Chat khiêu dâm, spam chat, kích động các người dùng khác để gây rối hoặc tuyên truyền những thông tin vi phạm Đăng tải nội dung, thông tin sai sự thật, vu khống, xuyên tạc, xúc phạm uy tín của cơ quan, tổ chức và danh dự, nhân phẩm của cá nhân.
    - Đăng tải thông tin không phù hợp với lợi ích đất nước Đăng tải tác phẩm đã có quyết định cấm lưu hành hoặc tịch thu
    - Quảng cáo: nội dung đăng tải của người sử dụng có chứa thông tin quảng cáo hoặc sử dụng các văn bản, hình ảnh, âm thanh, hoặc video và thông tin quảng cáo khác bao gồm nhưng không giới hạn những nội dung như: Tuyên truyền hoặc liên quan đến việc quảng bá sản phẩm và hình ảnh, các hoạt động thương mại, các sự kiện … và các thông tin quảng cáo khác mà không có sự đồng ý bằng văn bản của sPhoton.
    - Xâm phạm riêng tư: sử dụng hình ảnh cá nhân của người khác, công khai những tư liệu cá nhân và những thông tin của khác như danh tính, địa chỉ, số điện thoại mà chưa được sự đồng ý.
    - Công kích người khác: sử dụng hình ảnh, thông tin, âm thanh hoặc video, xúc phạm, đưa thông tin xuyên tạc, vu khống, nhạo báng, xúc phạm uy tín tới tổ chức, cá nhân.
    - Vi phạm bản quyền: sử dụng nội dung không thuộc bản quyền của mình để đăng tải lên “Đoán Xem” mà không được phép của chủ quyền.
  + Hình thức xử phạt 3, khóa tài khoản 30 ngày hoặc khóa vĩnh viễn theo khoản 1 điều này được áp dụng bao gồm nhưng không giới hạn đối với các hành vi sau:
    - Người Sử Dụng có hành vi lợi dụng “Đoán Xem” nhằm chống phá nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam. Phá hoại khối đại đoàn kết toàn dân tộc
    - Tuyên truyền kích động chiến tranh xâm lược, gây hận thù giữa các dân tộc và nhân dân các nước, kích động bạo lực, truyền bá tư tưởng phản động
    - Xuyên tạc sự thật lịch sử, phủ nhận thành tựu cách mạng, xúc phạm dân tộc, danh nhân, anh hùng dân tộc.
    - Đăng tải, sử dụng hình ảnh bản đồ Việt Nam nhưng không thể hiện hoặc thể hiện không đúng chủ quyền quốc gia.
    - Sử Dụng đặt tên tài khoản trùng tên với các vĩ nhân, các vị anh hùng của dân tộc, các vị lãnh đạo của đảng và nhà nước, hoặc Người Sử Dụng có sử dụng hình ảnh, video, phát ngôn, chat… có chứa thông tin bàn luận về vấn đề chính trị hoặc tiết lộ bí mật nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. 
    -Thông tin, hình ảnh, video khiêu dâm: Người Sử Dụng đăng tải hình ảnh, âm thanh, video khiêu dâm, chat sex, video khiêu dâm ở mức độ cao. 
    - Thông tin cá cược, cờ bạc: Cung cấp, trao đổi, truyền đưa, lưu trữ, sử dụng thông tin, dịch vụ có nội dung cờ bạc, lô đề, và các hình thức tổ chức đánh bạc khác trên mạng xã hội “Đoán Xem”.
    - Đăng tải thông tin, quảng cáo sản phẩm, hàng hóa, dịch vụ cấm Lan truyền thông tin lừa đảo: Sử dụng văn bản, hình ảnh, âm thanh hoặc video có chứa thông tin lừa đảo giả mạo các tổ chức hoặc cá nhân, gian lận, lừa đảo tài sản của người khác hoặc tài khoản “Đoán Xem”
    - Phá hoại hệ thống mạng xã hội “Đoán Xem’ người dùng lợi dụng việc sử dụng sản phẩm để xâm nhập vào hệ thống máy chủ nhằm phá hoại sản phẩm hoặc cản trở việc truy cập thông tin.Người dùng sử dụng công cụ kỹ thuật nhằm tăng điểm hoạt động, vật phẩm hoặc nhằm treo máy, spam chat. 
    - Sử dụng “Đoán Xem” để lôi kéo tổ chức hội họp thực tế ở bên ngoài thực hiện các hành vi vi phạm pháp luật.
  Thỏa Thuận này bao gồm toàn bộ thỏa thuận giữa bạn và sPhoton, liên quan đến việc sử dụng Ứng Dụng “Đoán Xem” của chúng tôi. Nếu bất kỳ điều khoản của Thỏa Thuận này vô hiệu, phần còn lại của Thỏa Thuận này sẽ tiếp tục có hiệu lực thi hành. Thỏa Thuận này có thể bị thay đổi bất kỳ lúc nào bởi sPhoton. Nếu bạn là một Thành Viên không đăng ký tại thời điểm có sự thay đổi, những thay đổi này sẽ có hiệu lực khi đăng tải trên Ứng Dụng và việc bạn sử dụng Dịch Vụ sau khi những thay đổi này được đăng tải sẽ được xem là bạn đã chấp nhận những thay đổi của Thỏa Thuận này.`}
      </AppText>
    </View>
  );
}

export default RuleText;

const styles = StyleSheet.create({
  container: {
    paddingTop: unit23,
    paddingHorizontal: unit20,
  },
  title: {
      fontSize: unit16,
      fontWeight: '600',
      marginBottom: unit12,
    },
  content: {
      fontSize: fontSize14,
      lineHeight: unit20,
    marginBottom: unit20
  },
});


