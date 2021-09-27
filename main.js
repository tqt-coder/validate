const container = '.form-register__containter';
const showError = '.text-error';
let index =1;
const arrInfor = [];
let htmls = `<tr>
    <th>No</th>
    <th>First name</th>
    <th>Last name</th>
    <th>Email</th>
    <th>Username</th>
</tr>`
arrInfor.push(htmls);
const formRegister = () => {
    const form1 = document.querySelector('.form-register');
    const inputs = form1.querySelectorAll('input[name]:not(:disabled)');
    const submit = form1.querySelector('.form-register__btn');
    const userInfor = document.querySelector('.user-infor');

    // Use generate object with key is input's name and value is an array rules
    const obRule = Array.from(inputs).reduce((input, value) => {
        let rules = value.getAttribute('rule').split('|');
        Array.from(rules).forEach((rule) => {
            if (Array.isArray(input[value.name])) {
                input[value.name].push(rule);
            }
            else {
                input[value.name] = [rule];
            }
        });
        return input;
    }, {});

    // generate object check rules
    const handlerError = {
        isRequired: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập thông tin';
        },
        isEmail: (value) => {
            const result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            return result ? undefined : 'Vui lòng nhập đúng định dạng email';
        },
        isPassword: (value) => {
            const pass = form1.querySelector('input[name="pass"]:not(disabled)').value;
            return pass === value ? undefined : 'Vui lòng nhập đúng mật khẩu xác nhận';
        }

    };

    //console.log(handlerError.isPassword('Tuan'));
    (function handlerCode() {
        [...inputs].forEach((input, index) => {

            input.onblur = function(e){
                const tagInput = e.target;
                handlerBlur(tagInput);
            };
            // handler when user input
            input.oninput = handlerInput;
        });
    })()

    function findParent(input, parent) {
        do {
            if (input.parentElement.matches(parent)) {
                return input.parentElement;
            }
            else {
                input = input.parentElement;
            }
        }
        while (input.parentElement);


    }


    function handlerInput(e) {
        let input = e.target;
        const parentInput = findParent(input, container);
        parentInput.classList.remove('validate');
        parentInput.querySelector(showError).innerText = '';
    }

    function handlerBlur(input) {
        for (let i = 0; i < obRule[input.name].length; i++) {
            // obRule[input.name][i] is value of ObRule[key]
            let rule = obRule[input.name][i];
            let textError = handlerError[rule](input.value);
            const parentInput = findParent(input, container);
            if (textError) {
                if (parentInput) {
                    parentInput.classList.add('validate');
                    parentInput.querySelector(showError).innerText = textError;
                    return textError;
                }
            }
            else {
                parentInput.classList.remove('validate');
                parentInput.querySelector(showError).innerText = '';
            }
        }
    }

   
 
   
    
    // handler submit
    submit.onclick = (e) => {
        e.preventDefault();
        let flag = true;
        const information = {};
        [...inputs].forEach((input, index) => {
            flag = !handlerBlur(input);
            information[input.name] = input.value;
        });
        if(flag){
            
           // thỏa hết tất cả
           
            let rowInfor = `<tr>
            <th>${index}</th>
            <th>${information['fname']}</th>
            <th>${information['lname']}</th>
            <th>${information['email']}</th>
            <th>${information['userName']}</th>
                            </tr>
            
            `
            arrInfor.push(rowInfor);
            index ++;
            let html = arrInfor.join('\n');
            userInfor.innerHTML =  html;
            [...inputs].forEach((input, index) => {
                input.value = "";
            });
        }
        else{
            
        }
    };

};

formRegister();

