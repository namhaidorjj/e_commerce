import * as Yup from "yup";

export const SignInValidation = Yup.object({
  name: Yup.string().min(3).required(""),
  email: Yup.string()
    .email("Имэйл хаягаа оруулна уу!")
    .required("Имэйл хаягаа оруулна уу!"),
  password: Yup.string()
    .min(7)
    .required(
      "Нууц үг нь хамгийн багадаа 6 оронтой 1 том үсэг, 1 жижиг үсэг, тоо, 1 тусгай тэмдэгт орсон байх ёстой!"
    ),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг хоорондоо таарахгүй байна!")
    .required(""),
});
