import { MailtrapClient }  from "mailtrap";

const token = "ba4547ba4077235e2edbc93311545db5";

const client = new MailtrapClient( { token} );

const sender = {
  email: "hello@demomailtrap.com",
  name: "Linkedin Team",
};

const recipients = [
  {
    email: "20sept2024@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text : "welcome to linkedin " , 
    html : "" ,
    category: "Integration Test",
  })
  .then(console.log, console.error);


