var list = ["北京","广东","广州"];
const url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
var ala="";
var num1="";
var num2="";
var num11="";
var num22="";
function num(location, result) {
  var loc = location;
  var resu = result;
  var loc_new = new RegExp(loc + "[\\s\\S]*?confirm[\\s\\S]{3}(\\d+)");
  var loc_now = new RegExp(loc + "[\\s\\S]*?nowConfirm[\\s\\S]{3}(\\d+)");
  let loc_new_res = loc_new.exec(resu);
  let loc_now_res = loc_now.exec(resu);
  if (loc_new_res) {
  num1=loc_new_res[1].padStart(5,"\u0020");
  num2=loc_now_res[1].padStart(5,"\u0020");
    num11=num1.replace(/\s/g, "");
    num22=num2.replace(/\s/g, "");
    ala = ala +loc +"           " +num11.padStart(5,"\u0020")+"        "+num22.padStart(5,"\u0020")+ "\n";
  } else {
    ala = ala + loc + "           查无数据\n";
  }
};
$httpClient.get(url, function(error, response, data){
  let res = data;
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  hour = hour > 9 ? hour : "0" + hour;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  for (var i = 0; i < list.length; i++) {
    num(list[i], res);
    if (i == list.length - 1) {
     $done({
       title: "COVID-19:   新增   |   现存   |   "+hour+":"+minutes,
       icon:"note.text.badge.plus",
       "icon-color":"#5AC8FA",
       content: ala.replace(/\n$/, "").replace("中国", "全国")
     });
    }
  }
});
