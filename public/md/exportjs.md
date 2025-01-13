```
js实现 导出文件流
```

```ts 

export function exportExcel( url: any, payload:any) {
  if (!url) {
    return;
  }
  let xhr = new XMLHttpRequest();
  let token = localStorage.getItem("token") || "";
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = xhr.response;
      if (data.code && data.code !== 0) {
        message.error(data.message);
        if(data.code===20001){
          history.push('/login')
        }
      } else {
        const blob = new Blob([data]);
        let blobUrl = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.download =
          "列表" +
          moment(new Date()).format("YYYY-MM-DD HH:mm:ss") +
          ".xlsx";
        alink.style.display = "none";
        alink.href = blobUrl;
        alink.click();
        window.URL.revokeObjectURL(alink.href);
      }
    }
  };
  xhr.open("post", url, true); // 设置请求头token
  xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded; charset=utf-8",)
  xhr.responseType = "blob";
  // 发送请求
  xhr.send(stringify({ ...payload, token }))
}



判断blob是什么格式的
var reader = new FileReader();
reader.onload = function (event) {
  var content = reader.result; //内容就在这里
};
reader.readAsText(blob);

var fr = new FileReader();
fr.onload = function (evt) {
  var res = evt.target.result;
  console.log("onload", arguments, res, typeof res);
};
fr.readAsArrayBuffer(b);



判断导出文件是什么格式的是json还是文件流
try{
  let reader = new FileReader();
        reader.onload = function () {
          let content: object | string | null | ArrayBuffer;
          content = reader.result; //内容就在这里
          const jsonData = JSON.parse(content);
          if (jsonData.errcode !== 0) {
        message.error(jsonData.message);
       }
     };
    reader.readAsText(this.response);
}catch(err){

// 如果执行到这里，说明下载是文件流了，进行后续处理


}


```