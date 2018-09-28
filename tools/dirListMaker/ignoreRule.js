/**
 * Created by Trubasa 1141521502@qq.com on 2018/9/27.
 */
function ignore(fileName){
  let isHidden = /^\..*$/igm.test(fileName);
  let isTarget=/node_module/igm.test(fileName);

  let flag=(isHidden||isTarget)?true:false
  return flag;
}
module.exports=ignore
