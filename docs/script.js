const validate = {
   ip : /^\d{3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g
};

const geoApi = async(e)=>{
   e.preventDefault();
   const ip = document.getElementById('ip-address');

   try{
      if(!validate.ip.test(ip.value)) document.querySelector('.err-message').style = 'opacity: 1';
      else{
         const request  = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_dnV1K6QzUCgKxIYDb1wGgfj4p0pJf&ipAddress=${ip.value}`);
         const response = await request.json();
         const location = response.location;
         document.querySelector('.err-message').style = 'opacity: 0';
 
         document.getElementById('frame').setAttribute('src',`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26307.666291882404!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1664226243290!5m2!1ses-419!2sar`);
         
         document.querySelector('.ip').textContent = response.ip;
         document.querySelector('.location').textContent = location.city;
         document.querySelector('.timezone').textContent = `UTC ${location.timezone}`;
         document.querySelector('.isp').textContent = response.isp;
         ip.value = '';
      }     
   }catch(e){
       console.log(e);
   }
}

document.querySelector('.form').addEventListener('submit',geoApi);