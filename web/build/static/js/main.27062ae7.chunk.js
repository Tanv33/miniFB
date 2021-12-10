(this["webpackJsonpsignup-login-mern"]=this["webpackJsonpsignup-login-mern"]||[]).push([[0],{172:function(e,t){var a="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"";e.exports=a},195:function(e,t,a){},196:function(e,t,a){},197:function(e,t,a){},325:function(e,t,a){},337:function(e,t,a){},338:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(59),s=a.n(o),i=(a(195),a(196),a(10)),l=(a(197),a(394)),c=a(385),d=a(393),u=a(395),h=a(49),m=a(28),p=a(23),j=a.n(p),b=a(388),x=a(378),g=a(1);function f(e){return Object(g.jsx)(x.a,{sx:{width:"100%",position:"absolute",top:"0"},spacing:2,children:Object(g.jsx)(b.a,{severity:e.type,children:e.message})})}var O=a(22),v=a(85),A=function(e,t){switch(t.type){case"USER_LOGIN":return t.payload.fullName&&t.payload.email&&t.payload.gender&&t.payload.phoneNumber&&t.payload.address?Object(v.a)(Object(v.a)({},e),{},{user:t.payload}):(console.log("invalid data in USER_LOGIN reducer "),e);case"USER_LOGOUT":return Object(v.a)(Object(v.a)({},e),{},{user:null});default:return e}},w=Object(n.createContext)("Initial Value"),y={user:void 0};function C(e){var t=e.children,a=Object(n.useReducer)(A,y),r=Object(i.a)(a,2),o=r[0],s=r[1];return Object(g.jsx)(w.Provider,{value:{state:o,dispatch:s},children:t})}var N=m.a({email:m.b("Enter your email").min(14,"Email should be 14 characters long").email("Enter a valid email").required("Email is required"),password:m.b("Enter your password").min(8,"Password should be of minimum 8 characters length").required("Password is required")});var E=function(){var e=Object(n.useContext)(w).dispatch,t=Object(n.useState)(void 0),a=Object(i.a)(t,2),r=a[0],o=a[1],s="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"",m=Object(h.a)({initialValues:{email:"",password:""},validationSchema:N,onSubmit:function(t){j.a.post("".concat(s,"/api/v1/auth/login"),{email:t.email,password:t.password},{withCredentials:!0}).then((function(t){"Incorrect email"===t.data&&(o(!1),setTimeout((function(){o(void 0)}),1e3)),"Incorrect password"===t.data&&(o(""),setTimeout((function(){o(void 0)}),1e3)),"Incorrect password"!==t.data&&"Incorrect email"!==t.data&&(o(!0),setTimeout((function(){e({type:"USER_LOGIN",payload:{id:t.data._id,fullName:t.data.fullName,email:t.data.email,gender:t.data.gender,phoneNumber:t.data.phoneNumber,address:t.data.address}}),p.push("/"),o(void 0)}),500))})).catch((function(e){console.log(e.response.data)}))}}),p=Object(O.f)();return Object(g.jsxs)(g.Fragment,{children:[!0===r?Object(g.jsx)(f,{type:"success",message:"Welcome"}):"",!1===r?Object(g.jsx)(f,{type:"error",message:"Incorrect email"}):"",""===r?Object(g.jsx)(f,{type:"error",message:"Incorrect password"}):"",Object(g.jsx)("div",{className:"mainParent",children:Object(g.jsxs)("div",{className:"parentChild",children:[Object(g.jsx)("div",{className:"loginHeading",children:Object(g.jsx)(d.a,{variant:"h4",style:{fontWeight:"bold",color:"#800020"},children:"Login Form"})}),Object(g.jsxs)(l.a,{type:"form",component:"form",noValidate:!0,autoComplete:"off",textAlign:"center",onSubmit:m.handleSubmit,children:[Object(g.jsx)(c.a,{fullWidth:!0,type:"email",name:"email",label:"Email",variant:"outlined",placeholder:"Enter your Email",value:m.values.email,onChange:m.handleChange,error:m.touched.email&&Boolean(m.errors.email),helperText:m.touched.email&&m.errors.email,style:{marginBottom:"15px"}}),Object(g.jsx)(c.a,{fullWidth:!0,type:"password",name:"password",id:"outlined-basic",label:"Password",variant:"outlined",placeholder:"Enter Password",value:m.values.password,onChange:m.handleChange,error:m.touched.password&&Boolean(m.errors.password),helperText:m.touched.password&&m.errors.password}),Object(g.jsx)("button",{type:"button",style:{display:"flex",alignItems:"flex-start",marginTop:"4px",marginLeft:"8px",border:"none",backgroundColor:"transparent",padding:0,fontFamily:"arial",textDecoration:"underline",cursor:"pointer",color:"blue"},onClick:function(){return p.push("/forgetpassword")},children:"Forget password"}),Object(g.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",marginTop:"12px"},children:[Object(g.jsx)(u.a,{type:"submit",size:"small",variant:"contained",style:{marginRight:"5px",backgroundColor:"#800020"},children:"Submit"}),Object(g.jsx)(u.a,{variant:"contained",size:"small",color:"error",onClick:function(){return p.push("/signup")},style:{backgroundColor:"#800020"},children:"Create an account"})]})]})]})})]})},S=(a(325),a(387)),T=a(389),P=a(396),I=a(390),k=a(383),q=m.a({fullName:m.b("Enter a valid Name").min(8,"Name should be 8 characters long").required("Name is required"),email:m.b("Enter your email").min(14,"Email should be 14 characters long").email("Enter a valid email").required("Email is required"),phoneNumber:m.b("Enter your phone number").min(10,"Phone number should be 10 integers long").required("Phone number is required"),password:m.b("Enter your password").min(8,"Password should be of minimum 8 characters length").required("Password is required"),address:m.b("Enter your address").min(20,"Address should be of minimum 20 characters in length").required("Address is required")});var B=function(){var e=Object(O.f)(),t=Object(n.useState)(""),a=Object(i.a)(t,2),r=a[0],o=a[1],s="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"",m=Object(h.a)({initialValues:{fullName:"",email:"",phoneNumber:"",password:"",address:""},validationSchema:q,onSubmit:function(t){var a=document.querySelector('input[name="gender"]:checked').value;j.a.post("".concat(s,"/api/v1/auth/signupuser"),{fullName:t.fullName,email:t.email,gender:a,phoneNumber:Number(t.phoneNumber),password:t.password,address:t.address}).then((function(t){return"user created"===t.data?(o(!0),void setTimeout((function(){e.push("/"),o("")}),1e3)):"user already exist"===t.data?(o(!1),void setTimeout((function(){o("")}),1e3)):void 0})).catch((function(e){}))}});return Object(n.useEffect)((function(){j.a.get("".concat(s,"/api/v1/auth/signupuser")).then((function(e){}))}),[]),Object(g.jsxs)("div",{children:[!0===r?Object(g.jsx)(f,{type:"success",message:"Welcome! Successfully account created"}):"",!1===r?Object(g.jsx)(f,{type:"error",message:"Sorry: Email already exist"}):"",Object(g.jsx)("div",{className:"mainParentSign",children:Object(g.jsxs)("div",{className:"parentChildSign",children:[Object(g.jsx)("div",{className:"loginHeadingSign",children:Object(g.jsx)(d.a,{variant:"h4",style:{fontWeight:"bold",color:"#800020"},children:"Signup Form"})}),Object(g.jsxs)(l.a,{type:"form",component:"form",noValidate:!0,autoComplete:"off",onSubmit:m.handleSubmit,children:[Object(g.jsx)(c.a,{fullWidth:!0,name:"fullName",label:"Full Name",variant:"outlined",placeholder:"Enter Your Name",value:m.values.fullName,onChange:m.handleChange,onBlur:m.handleBlur,error:m.touched.fullName&&Boolean(m.errors.fullName),helperText:m.touched.fullName&&m.errors.fullName,style:{marginBottom:"10px"}}),Object(g.jsx)(c.a,{fullWidth:!0,name:"email",type:"email",label:"Email",variant:"outlined",placeholder:"Enter your Email",value:m.values.email,onChange:m.handleChange,error:m.touched.email&&Boolean(m.errors.email),helperText:m.touched.email&&m.errors.email,style:{marginBottom:"10px"}}),Object(g.jsxs)(I.a,{component:"fieldset",children:[Object(g.jsx)(k.a,{component:"legend",style:{textAlign:"left"},children:"Gender"}),Object(g.jsxs)(T.a,{"aria-label":"gender",defaultValue:"male",name:"genderParent",children:[Object(g.jsx)(P.a,{name:"gender",value:"male",control:Object(g.jsx)(S.a,{}),label:"Male"}),Object(g.jsx)(P.a,{name:"gender",value:"female",control:Object(g.jsx)(S.a,{}),label:"Female"})]})]}),Object(g.jsx)(c.a,{fullWidth:!0,name:"phoneNumber",label:"Phone Number",type:"number",variant:"outlined",placeholder:"Enter Phone Number",value:m.values.phoneNumber,onChange:m.handleChange,error:m.touched.phoneNumber&&Boolean(m.errors.phoneNumber),helperText:m.touched.phoneNumber&&m.errors.phoneNumber,style:{marginBottom:"10px"}}),Object(g.jsx)(c.a,{fullWidth:!0,name:"password",type:"password",label:"Password",variant:"outlined",placeholder:"Enter Password",value:m.values.password,onChange:m.handleChange,error:m.touched.password&&Boolean(m.errors.password),helperText:m.touched.password&&m.errors.password,style:{marginBottom:"10px"}}),Object(g.jsx)(c.a,{fullWidth:!0,name:"address",id:"outlined-basic",label:"Address",variant:"outlined",placeholder:"Type Your address",value:m.values.address,onChange:m.handleChange,error:m.touched.address&&Boolean(m.errors.address),helperText:m.touched.address&&m.errors.address,style:{marginBottom:"10px"}}),Object(g.jsx)(u.a,{type:"submit",size:"medium",variant:"contained",style:{marginRight:"5px",backgroundColor:"#800020",marginBottom:"15px"},children:"Submit"}),Object(g.jsx)(u.a,{size:"medium",variant:"contained",color:"success",style:{backgroundColor:"#800020",marginBottom:"15px"},onClick:function(){return e.push("/")},children:"I have an account"})]})]})})]})},F=a(17),G=a(399),J=a(397),R=a(398),W=a(401),Y=a(402),L=a(404),M=a(403),U=a(392),z=a(172),D=a.n(z);function K(e){var t=e.title,a=e.subHeader,n=e.smallImg,r=e.imgStrPath,o=e.mainImg,s=e.content,i=e.identity;return Object(g.jsxs)(W.a,{id:i,sx:{flexGrow:1,maxWidth:900,m:2},children:[Object(g.jsx)(Y.a,{avatar:Object(g.jsx)(U.a,{alt:"",src:n}),title:t||"User",subheader:a||"Waiting..."}),Object(g.jsx)(M.a,{component:"img",image:o||"https://www.w3schools.com/css/img_lights.jpg",alt:"Post Pics"}),Object(g.jsx)(L.a,{children:Object(g.jsx)(d.a,{variant:"body2",color:"text.secondary",component:"p",children:s||"Waiting for content..."})}),Object(g.jsx)(u.a,{sx:{m:1},variant:"contained",color:"error",onClick:function(e){j.a.post("".concat(D.a,"/api/v1/post/postdelete"),{postId:e.target.parentElement.id,imgStrPath:r},{withCredentials:!0}).then((function(t){"Successfully Deleted"===t.data&&(e.target.innerText="Successfully Deleted",e.target.style.backgroundColor="darkgreen"),"Error while deleting file from storage"===t.data&&(e.target.innerText="Error while deleting file from storage",e.target.style.backgroundColor="darkred"),"It's not your Post"===t.data&&(e.target.innerText="It's not your Post",e.target.style.backgroundColor="gray")})).catch((function(e){}))},id:i,children:"Delete"})]})}var Q=a(173),Z=a.n(Q);var X=function(){return Object(g.jsx)("div",{style:{position:"relative",marginTop:"10px",marginBottom:"10px",display:"flex",justifyContent:"center"},children:Object(g.jsx)("img",{src:"data:image/gif;base64,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",alt:"loading..."})})},H=a(177);var V=function(){var e=Object(O.f)(),t="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"",a=Object(n.useContext)(w),r=a.state,o=a.dispatch,s=Object(n.useState)(""),h=Object(i.a)(s,2),m=h[0],p=h[1],b=Object(n.useState)(""),x=Object(i.a)(b,2),v=x[0],A=x[1],y=Object(n.useState)([]),C=Object(i.a)(y,2),N=C[0],E=C[1],S=Object(n.useState)(void 0),T=Object(i.a)(S,2),P=T[0],I=T[1],k=Object(n.useState)(void 0),q=Object(i.a)(k,2),B=q[0],W=q[1],Y=Object(n.useState)(!0),L=Object(i.a)(Y,2),M=L[0],U=L[1];return Object(n.useEffect)((function(){return j.a.get("".concat(t,"/api/v1/post/posts?page=0"),{withCredentials:!0}).then((function(e){E(e.data)})),function(){}}),[]),Object(n.useEffect)((function(){var e=Object(H.a)("http://localhost:2000");return e.on("connect",(function(){})),e.on("NEWPOSTS",(function(e){E((function(t){return[e].concat(Object(F.a)(t))}))})),e.on("disconnect",(function(e){})),function(){e.close()}}),[]),Object(g.jsxs)("div",{children:[Object(g.jsx)(l.a,{sx:{flexGrow:1},children:Object(g.jsx)(J.a,{position:"static",sx:{backgroundColor:"#800020"},children:Object(g.jsxs)(R.a,{children:[Object(g.jsx)(d.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:Object(g.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return e.push("/")},children:"Home"})}),Object(g.jsx)(u.a,{color:"inherit",onClick:function(){return e.push("/profile")},children:r.user.fullName}),Object(g.jsx)(u.a,{color:"inherit",onClick:function(){j.a.post("".concat(t,"/api/v1/auth/logout"),{},{withCredentials:!0}).then((function(t){W(t.data),I(!0),setTimeout((function(){I(void 0),o({type:"USER_LOGOUT",payload:""}),e.push("/")}),1e3)})).catch((function(e){W(e.response.data),I(!1),setTimeout((function(){I(void 0)}),2e3)}))},children:"Logout"})]})})}),Object(g.jsxs)(G.a,{children:[Object(g.jsx)(d.a,{variant:"h4",style:{marginTop:"30px",fontWeight:"bold",color:"darkred"},children:"Type your Post"}),Object(g.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),v.size>2e6)return W("File Size should not be greater than 2MB"),I(!1),void setTimeout((function(){I(void 0)}),2e3);if(""===m)return W("Input area should not be empty"),I(!1),void setTimeout((function(){I(void 0)}),2e3);var a=new FormData;a.append("File",v),a.append("text",m),a.append("fullName",r.user.fullName),a.append("id",r.user.id),a.append("name","user"),a.append("details",JSON.stringify({subject:"user Post",year:"2021"})),j()({method:"post",url:"".concat(t,"/api/v1/post/posts"),data:a,headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then((function(e){p(""),I(!0),W(e.data),setTimeout((function(){I(void 0)}),2e3)})).catch((function(e){W(e.response.data),I(!1),setTimeout((function(){I(void 0)}),2e3)}))},children:[Object(g.jsxs)(l.a,{sx:{"& > :not(style)":{marginTop:"20px",marginBottom:"14px",width:"100%"}},autoComplete:"off",children:[Object(g.jsx)(c.a,{label:"Enter text",value:m,onChange:function(e){p(e.target.value)},variant:"filled",required:!0}),Object(g.jsx)(c.a,{type:"file",onChange:function(e){return A(e.target.files[0])},accept:"image/*",name:"fileInput",id:"fileInput",required:!0})]}),Object(g.jsx)(u.a,{variant:"contained",color:"error",size:"large",style:{marginBottom:"40px"},type:"submit",children:"Post"})]}),Object(g.jsx)("div",{style:{backgroundColor:"#800020",textAlign:"center",padding:"16px",borderRadius:"5px"},children:Object(g.jsx)(d.a,{variant:"h6",color:"white",children:"All Users Posts"})}),Object(g.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%"},children:[Object(g.jsx)("br",{}),Object(g.jsx)(Z.a,{pageStart:0,loadMore:function(){return j.a.get("".concat(t,"/api/v1/post/posts?page=").concat(N.length),{withCredentials:!0}).then((function(e){if(e.data.length){var t=[].concat(Object(F.a)(N),Object(F.a)(e.data));E(t)}else U(!1)})),function(){}},hasMore:M,loader:Object(g.jsx)(X,{},0),children:N.map((function(e,t){return Object(g.jsx)(K,{identity:e._id,imgStrPath:e.imgStrPath,title:e.author,subHeader:"10 mins ago",content:e.text,mainImg:e.postUrl},t)}))})]})]}),!0===P?Object(g.jsx)(f,{type:"success",message:B}):"",!1===P?Object(g.jsx)(f,{type:"error",message:B}):""]})};var _=function(){var e=Object(O.f)(),t="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"",a=Object(n.useContext)(w),r=a.state,o=a.dispatch,s=Object(n.useState)(""),m=Object(i.a)(s,2),p=m[0],b=m[1],x=Object(n.useState)([]),v=Object(i.a)(x,2),A=v[0],y=v[1],C=Object(n.useState)(!0),N=Object(i.a)(C,2),E=N[0],S=N[1];Object(n.useEffect)((function(){return j.a.get("".concat(t,"/api/v1/post/post"),{withCredentials:!0}).then((function(e){y(e.data)})),function(){}}),[]);var T=Object(h.a)({initialValues:{fullName:r.user.fullName,gender:r.user.gender,phoneNumber:r.user.phoneNumber,address:r.user.address},onSubmit:function(e){j.a.put("".concat(t,"/api/v1/post/updateprofile"),{fullName:e.fullName,gender:e.gender,phoneNumber:e.phoneNumber,address:e.address},{withCredentials:!0}).then((function(e){S(!E),window.location.reload()})).catch((function(e){}))}});return Object(g.jsxs)("div",{children:[!0===p?Object(g.jsx)(f,{type:"success",message:"Good bye!"}):"",!1===p?Object(g.jsx)(f,{type:"error",message:"Sorry! Something went wrong"}):"",Object(g.jsx)(l.a,{sx:{flexGrow:1},children:Object(g.jsx)(J.a,{position:"static",sx:{backgroundColor:"#800020"},children:Object(g.jsxs)(R.a,{children:[Object(g.jsx)(d.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:Object(g.jsxs)("span",{style:{cursor:"pointer"},onClick:function(){return e.push("/")},children:[" ","Home"]})}),Object(g.jsx)(u.a,{color:"inherit",onClick:function(){return e.push("/profile")},children:r.user.fullName})," ",Object(g.jsx)(u.a,{color:"inherit",onClick:function(){var a;(null===r||void 0===r||null===(a=r.user)||void 0===a?void 0:a.fullName)?(j.a.post("".concat(t,"/api/v1/auth/logout"),{},{withCredentials:!0}).then((function(e){})),b(!0),setTimeout((function(){o({type:"USER_LOGOUT",payload:""}),e.push("/"),b([])}),1e3)):(b(!1),setTimeout((function(){b([])}),1e3))},children:"Logout"})]})})}),Object(g.jsxs)(G.a,{children:[Object(g.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"10px",marginBottom:"30px"},children:Object(g.jsx)("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdfwoLPgNXoV0q8tDwIPQNUF3drxXLF1KXzJA-kQJKZy0n6x7MdxGnArJ2ghGv95-CYc&usqp=CAU",style:{borderRadius:"50%"},alt:"userPic"})}),Object(g.jsx)("div",{style:{display:"flex",flexDirection:"column",marginBottom:"20px"},children:Object(g.jsx)("div",{style:{alignSelf:"center"},children:Object(g.jsxs)("form",{onSubmit:T.handleSubmit,children:[Object(g.jsxs)(d.a,{variant:"h6",children:["Name: \xa0"," ",E?r.user.fullName:Object(g.jsx)(c.a,{size:"small",variant:"outlined",name:"fullName",style:{marginBottom:"4px"},value:T.values.fullName,onChange:T.handleChange})]}),Object(g.jsxs)(d.a,{variant:"h6",style:{marginBottom:"4px"},children:["Email: \xa0",r.user.email]}),Object(g.jsxs)(d.a,{variant:"h6",children:["Gender: \xa0"," ",E?r.user.gender:Object(g.jsx)(c.a,{size:"small",variant:"outlined",name:"gender",style:{marginBottom:"4px"},value:T.values.gender,onChange:T.handleChange})]}),Object(g.jsxs)(d.a,{variant:"h6",children:["Phone Number: \xa0"," ",E?r.user.phoneNumber:Object(g.jsx)(c.a,{size:"small",variant:"outlined",type:"number",style:{marginBottom:"4px"},name:"phoneNumber",value:T.values.phoneNumber,onChange:T.handleChange})]}),Object(g.jsxs)(d.a,{variant:"h6",children:["Address: \xa0"," ",E?r.user.address:Object(g.jsx)(c.a,{size:"small",variant:"outlined",name:"address",style:{marginBottom:"4px"},value:T.values.address,onChange:T.handleChange})]}),E?Object(g.jsx)(u.a,{variant:"contained",onClick:function(){S(!1)},color:"error",type:"unsubmit",children:"Edit Profile"}):"",E?"":Object(g.jsx)(u.a,{variant:"contained",style:{float:"right"},type:"submit",color:"success",children:"Submit"})]})})}),Object(g.jsx)("br",{}),Object(g.jsx)("div",{style:{backgroundColor:"#800020",textAlign:"center",padding:"16px",borderRadius:"5px"},children:Object(g.jsx)(d.a,{variant:"h6",color:"white",children:"Your Posts"})}),Object(g.jsx)("br",{}),Object(g.jsx)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%"},children:A.map((function(e){return Object(g.jsx)(K,{identity:e._id,imgStrPath:e.imgStrPath,mainImg:e.postUrl,title:e.author,subHeader:"10 mins ago",content:e.text},e._id)}))})]})]})};a(337);var $=function(){return Object(g.jsx)("div",{className:"body",children:Object(g.jsxs)("div",{className:"text-blinking",children:[Object(g.jsx)("span",{children:"L"}),Object(g.jsx)("span",{children:"o"}),Object(g.jsx)("span",{children:"a"}),Object(g.jsx)("span",{children:"d"}),Object(g.jsx)("span",{children:"i"}),Object(g.jsx)("span",{children:"n"}),Object(g.jsx)("span",{children:"g"}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),"\xa0",Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."}),Object(g.jsx)("span",{children:"."})]})})},ee=m.a({email:m.b("Enter your email").min(14,"Email should be 14 characters long").email("Enter a valid email").required("Email is required")}),te=m.a({otp:m.b("Enter your OTP").required("OTP is required"),password:m.b("Enter your new password").min(8,"New Password should be 8 characters long").required("password is required"),confrimpassword:m.b("ReEnter your password").min(8,"New password should be 8 characters long").required("confirm password is required")});var ae=function(){var e=Object(O.f)(),t=Object(n.useState)(1),a=Object(i.a)(t,2),r=a[0],o=a[1],s=Object(n.useState)(""),m=Object(i.a)(s,2),p=m[0],b=m[1],x=Object(n.useState)(void 0),v=Object(i.a)(x,2),A=v[0],w=v[1],y=Object(n.useState)(void 0),C=Object(i.a)(y,2),N=C[0],E=C[1],S="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"",T=Object(h.a)({initialValues:{email:""},validationSchema:ee,onSubmit:function(e){j.a.post("".concat(S,"/api/v1/new/otp"),{email:e.email}).then((function(t){E(t.data),w(!0),setTimeout((function(){w(void 0),b(e.email),o(2)}),2e3)})).catch((function(e){E(e.response.data),w(!1),setTimeout((function(){w(void 0)}),2e3)}))}}),P=Object(h.a)({initialValues:{otp:"",password:"",confrimpassword:""},validationSchema:te,onSubmit:function(t){if(t.password!==t.confrimpassword)return E("password are not same"),w(!1),void setTimeout((function(){w(void 0)}),2e3);j.a.post("".concat(S,"/api/v1/new/newpassword"),{email:p,otp:t.otp,password:t.password,confrimpassword:t.confrimpassword}).then((function(t){E(t.data),w(!0),setTimeout((function(){w(void 0),e.push("/")}),2e3)})).catch((function(e){E(e.response.data),w(!1),setTimeout((function(){w(void 0)}),2e3)}))}});return Object(g.jsxs)(g.Fragment,{children:[!0===A?Object(g.jsx)(f,{type:"success",message:N}):"",!1===A?Object(g.jsx)(f,{type:"error",message:N}):"",Object(g.jsx)("div",{className:"mainParent",children:Object(g.jsx)("div",{className:"parentChild",children:1===r?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{className:"loginHeading",children:Object(g.jsx)(d.a,{variant:"h4",style:{fontWeight:"bold",color:"#800020"},children:"Forget Password"})}),Object(g.jsxs)(l.a,{type:"form",component:"form",noValidate:!0,autoComplete:"off",textAlign:"center",onSubmit:T.handleSubmit,children:[Object(g.jsx)(c.a,{fullWidth:!0,type:"email",name:"email",label:"Email",variant:"outlined",placeholder:"Type your Email",value:T.values.email,onChange:T.handleChange,error:T.touched.email&&Boolean(T.errors.email),helperText:T.touched.email&&T.errors.email}),Object(g.jsx)("div",{style:{display:"flex",alignItems:"flex-start",marginTop:"8px"},children:Object(g.jsx)(u.a,{type:"submit",size:"small",variant:"contained",style:{marginRight:"5px",backgroundColor:"#800020"},children:"Send OTP"})})]})]}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{className:"loginHeading",children:Object(g.jsx)(d.a,{variant:"h4",style:{fontWeight:"bold",color:"#800020"},children:"Enter OTP code and New Password"})}),Object(g.jsxs)(l.a,{type:"form",component:"form",noValidate:!0,autoComplete:"off",textAlign:"center",onSubmit:P.handleSubmit,children:[Object(g.jsx)(c.a,{fullWidth:!0,type:"number",name:"otp",label:"Otp",variant:"outlined",placeholder:"Enter your Otp Code",value:P.values.otp,onChange:P.handleChange,error:P.touched.otp&&Boolean(P.errors.otp),helperText:P.touched.otp&&P.errors.otp}),Object(g.jsx)(c.a,{fullWidth:!0,type:"password",name:"password",label:"New Password",variant:"outlined",placeholder:"Enter New Password",value:P.values.password,onChange:P.handleChange,error:P.touched.password&&Boolean(P.errors.password),helperText:P.touched.password&&P.errors.password,style:{marginTop:"10px"}}),Object(g.jsx)(c.a,{fullWidth:!0,type:"password",name:"confrimpassword",label:"Confirm Password",variant:"outlined",placeholder:"ReEnter your New Password",value:P.values.confrimpassword,onChange:P.handleChange,error:P.touched.confrimpassword&&Boolean(P.errors.confrimpassword),helperText:P.touched.confrimpassword&&P.errors.confrimpassword,style:{marginTop:"10px"}}),Object(g.jsx)("div",{style:{display:"flex",alignItems:"flex-start",marginTop:"8px"},children:Object(g.jsx)(u.a,{type:"submit",size:"small",variant:"contained",style:{marginRight:"5px",backgroundColor:"#800020"},children:"Submit"})})]})]})})})]})};var ne=function(){var e=Object(n.useContext)(w),t=e.state,a=e.dispatch,r="localhost"===window.location.hostname.split(":")[0]?"http://localhost:2000":"";return Object(n.useEffect)((function(){return j.a.get("".concat(r,"/api/v1/post/tokenverify"),{withCredentials:!0}).then((function(e){var t;(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.email)?a({type:"USER_LOGIN",payload:{id:e.data.id,fullName:e.data.fullName,email:e.data.email,gender:e.data.gender,phoneNumber:e.data.phoneNumber,address:e.data.address}}):a({type:"USER_LOGOUT"})})).catch((function(e){a({type:"USER_LOGOUT"})})),function(){}}),[]),Object(g.jsxs)(g.Fragment,{children:[void 0===t.user?Object(g.jsxs)(O.c,{children:[Object(g.jsx)(O.a,{exact:!0,path:"/",children:Object(g.jsx)($,{})}),Object(g.jsx)(O.a,{path:"*",children:Object(g.jsx)($,{})})]}):null,null===t.user?Object(g.jsxs)(O.c,{children:[Object(g.jsx)(O.a,{exact:!0,path:"/",component:E}),Object(g.jsx)(O.a,{exact:!0,path:"/signup",component:B}),Object(g.jsx)(O.a,{exact:!0,path:"/forgetpassword",component:ae}),Object(g.jsx)(O.a,{path:"*",children:Object(g.jsx)(E,{})})]}):null,t.user?Object(g.jsxs)(O.c,{children:[Object(g.jsx)(O.a,{exact:!0,path:"/",component:V}),Object(g.jsx)(O.a,{exact:!0,path:"/profile",component:_}),Object(g.jsx)(O.a,{path:"*",children:Object(g.jsx)(V,{})})]}):null]})},re=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,405)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),o(e),s(e)}))},oe=a(55);s.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(C,{children:Object(g.jsx)(oe.a,{children:Object(g.jsx)(ne,{})})})}),document.getElementById("root")),re()}},[[338,1,2]]]);
//# sourceMappingURL=main.27062ae7.chunk.js.map