Lỗi không find được react hoặc import lỗi do thằng Pod sinh ra React

Cách sửa:
Chèn React và yoga vào pod <Cái này vẫn chưa sure là có cần thiết không>
Run:
watchman watch-del-all
rm -rf node_modules/
npm install
npm start -- --reset-cache

Xoá thư mục React trong ios/Pods/React

có thể tham khảo nhưng không phải là cách fix
https://stackoverflow.com/questions/40368211/rctbundleurlprovider-h-file-not-found-appdelegate-m
