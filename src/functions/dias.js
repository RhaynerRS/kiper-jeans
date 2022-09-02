import dayjs from "dayjs";

export default function dias(){
  const dias = [];

  for (let i = 0; i < dayjs().daysInMonth(); i++) {
    dias.push(dayjs().daysInMonth() - (dayjs().daysInMonth() - i) + 1);
  }

  for (let p = 5;p>=0;p--) {
    dias.push((dayjs(`${dayjs().month()-1}`).daysInMonth() - p))
  }

  const proxy = new Proxy(dias, {
    get(target, prop) {
      if (!isNaN(prop)){
        prop = parseInt(prop, 10);
        if (prop<0){
          prop += target.length;
        }
      }
      return target[prop];
    }
  })

  return proxy;
}