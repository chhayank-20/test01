import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = (recipients)=>{
    const Token = process.env.MAILTRAP_TOKEN;
    const mailtrapClient = new MailtrapClient({ token : Token });
    const sender = {
        email : process.env.SENDER_MAIL ,
        name : "Team Linked-In"
    }
    mailtrapClient.send( {
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text : "welcome to linkedin " , 
        html : '<h1 style="color:red;"> you have been singed in .</h1>' ,
        category: "Integration Test",
      }
    )
    .then(console.log, console.error);
};



// try {
//     await sendWelcomeEmail(user.email, user.name, profileUrl);
// } catch (emailError) {
//     console.error("Error sending welcome Email", emailError);
// }





