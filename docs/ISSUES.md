1. Lỗi không find được react hoặc import lỗi do thằng Pod sinh ra React

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

2. Lỗi không complie được realm js
Realm nó đã bắt đầu support pods khi nó tự chèn các Header search paths vào rồi.
Tuy nhiên có 1 lỗi là cái header ở trong realm project phải để là non-recursive ở: Header Search Paths trong phần Library/RealReact
