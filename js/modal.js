const productBtnElems=document.querySelectorAll('.product__btn');
const producTitleElems=document.querySelectorAll('.product__title');
const productDescriptionElems=document.querySelectorAll('.product__description');

const disabledScroll=( )=>{
  document.body.scrollPosition=window.scrollY;
  document.body.style.cssText=`
    overflow: hidden;
    position: fixed;
    top:-${document.body.scrollPosition}px;
    left:0;
    height:100vh;
    width:100wv;
    padding-right:${window.innerWidth-document.body.offsetWidth}px;
  `;
}

const enabledScroll=()=>{
  document.body.style.cssText='';
  window.scroll({top:document.body.scrollPosition});
};

const createElem=(tag, attr)=>{
  const elem=document.createElement(tag);
  return Object.assign(elem,{...attr});
};

const createModal=(title, description)=>{
  const overlayElem=createElem('div',{className:'modal'}); 
  const modalElem=createElem('div',{className:'modal__block'});
  const modalContainerElem=createElem('div',
    {className:'modal__container'}
  );
  const titleElem=createElem('h2',
    {className:'modal__title', 
    textContent:`Заказать ${title}`,
  });
  const descriptionElem=createElem('p',
  {className:'modal__description',
    textContent:description,
  });
  const formElem=createElem('form',{
    className: 'modal__form',
    method:'post',
    action:'https://jsonplaceholder.typicode.com/posts',
    id:'order',
  });
  const nameLabelElem=createElem('label',{className:'modal__label'});
  const nameSpanElem=createElem('span',{
    className:'modal__text', 
    textContent:'Имя'
  });
  const nameInpElem=createElem('input',{
    className:'modal__input', 
    placeholder:'Введите ваше имя',
    name:'name',
    required:true,
  });
  const phoneLabelElem=createElem('label',{className:'modal__label'});
  const phoneSpanElem=createElem('span',{
    className:'modal__text', 
    textContent:'Телефон'
  });
  const phoneInpElem=createElem('input',
  {className:'modal__input', 
    placeholder:'Введите ваш телефон',
    name:'phone',
    required:true,
  });
  const hideInpElem=createElem('input',{
    className:'modal__input', 
    type:'hidden',
    name:'product',
    value:title,
  });
  const btnSubmit=createElem('button',{
    className: 'product__btn modal__btn',
    textContent:'Заказать',
    type:'submit',
  });
  btnSubmit.setAttribute('form', 'order');
  const closeModalBtn=createElem('btn',{
    className:'modal__close',
    innerHTML:`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
    </svg>`
  });
  overlayElem.addEventListener('click', (event)=>{
    const target=event.target;
    if ((target===overlayElem)|| (target.closest('.modal__close'))){
      overlayElem.remove();
      enabledScroll();
    }
    if(target===btnSubmit){
      if((/^[a-zA-Z1-9]{2,20}$/.test(nameInpElem.value) === true)&&
        (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phoneInpElem.value) === true)){
        modalContainerElem.remove();
        const name=nameInpElem.value;
        h2=createElem('h2',{textContent:`Спасибо за Ваш заказ, ${name}!`});
        h2.style.textAlign='center';
        h2.style.marginBottom='10px';
        p=createElem('p',{textContent:'Наш менеджер свяжется с вами в ближайшее время.'});
        p.style.textAlign='center';
        modalElem.append(h2, p);
      } else{event.preventDefault();}
    }
  });
  
  nameLabelElem.append(nameSpanElem, nameInpElem);
  phoneLabelElem.append(phoneSpanElem,phoneInpElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInpElem);
  modalContainerElem.append(titleElem, descriptionElem, formElem, btnSubmit,closeModalBtn);
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  disabledScroll();
  document.body.append(overlayElem);
}

for (let i=0; i<productBtnElems.length; i++){
  productBtnElems[i].addEventListener('click', ()=>{
    const title=producTitleElems[i].textContent;
    const description=productDescriptionElems[i].textContent;
    createModal(title, description);
  })
}