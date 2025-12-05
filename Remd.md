# Chạy demo
node server.js

# Hướng dẫn tạo Google OAuth Credentials

## 1. Truy cập Google Cloud Console
Mở trình duyệt và vào [Google Cloud Console](https://console.cloud.google.com) để quản lý các Project và API.

## 2. Tạo Project mới hoặc chọn Project đã có
Google yêu cầu mỗi ứng dụng phải thuộc về một Project.  
Bạn có thể:
- Tạo một Project mới hoàn toàn.
- Hoặc sử dụng Project đang tồn tại.

## 3. Đi đến mục APIs & Services → Credentials
Đây là nơi quản lý toàn bộ thông tin xác thực, API key, OAuth credentials,… dành cho ứng dụng.

## 4. Tạo OAuth Client mới
1. Chọn **Create Credentials → OAuth Client ID**.
2. Bắt đầu tạo thông tin đăng nhập phục vụ cho cơ chế SSO.

## 5. Chọn Application type là “Web application”
Vì ứng dụng cần triển khai SSO thông qua website, chọn loại ứng dụng là **Web**.

## 6. Cấu hình OAuth Client
- **Name**: đặt tên tùy ý, ví dụ `"SSO"` hoặc tên ứng dụng.
- **Authorized JavaScript origins**:
  - `http://localhost:3000`  
  (Đây là URL frontend của ứng dụng khi chạy trên máy local.)
- **Authorized redirect URIs**:
  - `http://localhost:3000/api/auth/google/callback`  
  (Đây là đường dẫn mà Google sẽ chuyển hướng về sau khi xác thực thành công. Backend của bạn sẽ xử lý token và tạo phiên đăng nhập.)

## 7. Hoàn tất
- Click **Create**.
- Sao chép **Client ID** và **Client Secret** để sử dụng trong ứng dụng.

-------


# Hướng dẫn tạo GitHub OAuth App

## 1. Truy cập GitHub Developer Settings
- Đăng nhập vào tài khoản GitHub.
- Mở trang **Developer Settings** để quản lý các ứng dụng OAuth và API.

## 2. Chọn mục OAuth Apps → New OAuth App
- Tại đây, bạn sẽ tạo mới một ứng dụng OAuth để GitHub có thể nhận diện ứng dụng khi người dùng đăng nhập.

## 3. Điền các thông tin cấu hình ứng dụng
- **Application name**: đặt tên tùy ý, ví dụ `"SSO"` hoặc tên hệ thống cần tích hợp.
- **Homepage URL**:  
  - `http://localhost:3000`  
  (Đây là URL của ứng dụng khi chạy trên môi trường local.)
- **Authorization callback URL**:  
  - `http://localhost:3000/api/auth/github/callback`  
  (GitHub sẽ chuyển hướng người dùng trở lại URL này sau khi hoàn tất xác thực. Backend sẽ xử lý mã xác thực và trao đổi để lấy access token.)

## 4. Click “Register application”
- Sau khi nhập đầy đủ thông tin, nhấn **Register application** để tạo mới ứng dụng OAuth.

## 5. Sao chép Client ID
- GitHub sẽ cung cấp **Client ID** ngay trên trang cấu hình ứng dụng sau khi đăng ký.

## 6. Tạo Client Secret
- Nhấn nút **Generate a new client secret**, GitHub sẽ tạo một **Client Secret** mới.
- Sao chép và lưu cẩn thận vì bạn sẽ cần sử dụng trong file cấu hình `.env` của backend.


