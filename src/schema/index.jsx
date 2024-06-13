import * as Yup from "yup";

export const signImSchema = Yup.object({
  name: Yup.string()
    .min(2, "The username must be at least two characters long.")
    .max(50, "Length exceeds")
    .required("Please enter the Username"),
  password: Yup.string()
    .min(2, "The password must be at least two characters long.")
    .max(100, "Length exceeds")
    .required("Please enter the Password"),
});

export const UpAdminSchema = Yup.object({
  fname: Yup.string().min(2).required("Please enter the First Name"),
  lname: Yup.string().min(2).required("Please enter the Last Name"),
  email: Yup.string().min(2).required("Please enter the Email"),
  address1: Yup.string().min(2).required("Please enter the Address"),
  state: Yup.string().required("Please enter the State"),
  city: Yup.string().required("Please enter the City"),
  // phone: Yup.string().required("Please enter the Phone"),
  zipcode: Yup.string().min(5).required("Please enter the Zip Code"),
  // password: Yup.string()
  // .when({
  //   is: (password) => password,
  //   then: Yup.string()
  //     .required("Please enter the Password")
  //     .min(6, "Your password must be at least 6 characters long")
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
  //       "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
  //     ),
  //   otherwise: Yup.string().notRequired(),
  // }),
  new_password: Yup.string().when({
    is: (new_password) => new_password,
    then: Yup.string()
      .required("Please enter the Password")
      .min(6, "Your password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
      ),
    otherwise: Yup.string().notRequired(),
  }),

  confirm_password: Yup.string()
    .when("new_password", {
      is: (new_password) => new_password,
      then: Yup.string().required("Please enter the Password again"),
      otherwise: Yup.string().notRequired(),
    })
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

export const forgotPassword = Yup.object({
  email: Yup.string().email().required("Please enter the Email"),
});

export const updateRegisterStoreSchema = Yup.object({
  stateprov: Yup.number().required("Please enter the State"),
  city: Yup.number()
    .required("Please enter the City")
    .typeError("City must be a number"),
  store: Yup.number()
    .required("Please enter the Store")
    .typeError("Store must be a number"),
});

export const updateStoreSchema = Yup.object({
  stateprov: Yup.number().required("Please enter the State"),
  city: Yup.number().required("Please enter the City"),
  store: Yup.number().required("Please enter the Store"),
});

const phoneRegExp = /^([0-9]{10})$/gm;
export const signUpSchema = Yup.object({
  username: Yup.string()
    .min(2, "The username must be at least 2 characters long.")
    .required("Please enter the Username"),
  fname: Yup.string()
    .min(2, "First Name must be at least 2 characters long.")
    .required("Please enter the First Name"),
  lname: Yup.string()
    .min(2, "Last Name must be at least 2 characters long.")
    .required("Please enter the Last Name"),

  ssn: Yup.string()
    .min(11, "Please enter valid SSN")
    .max(11, "Please enter complete SSN")
    .required("Please enter the SSN"),

  address1: Yup.string()
    .min(2, "The Address 1 must be at least 2 characters long.")
    .required("Please enter the Address1"),

  zipcode: Yup.string()
    .min(5, "The Zip Code must be at least 5 characters long.")
    .max(9, "The Zip Code must not be greater than 9 characters.")
    .required("Please enter the Zip Code"),
  email: Yup.string().email().required("Please enter the Email"),
  phone: Yup.string()
    .required("Please enter the Phone")
    .matches(phoneRegExp, "Please enter at least 10 digits"),

  retailer: Yup.number().required("Please select the Retailer"),
  stateprov2: Yup.number().required("Please select the State"),

  city2: Yup.number().required("Please enter the City"),

  signature: Yup.string()
    .min(2, "Signature must be at least 2 characters")
    .required("Please enter the Signature"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter the Email"),
  password: Yup.string()
    .min(6, "Your password must be at least 6 characters long")
    .required("Please enter the Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
    ),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    "You need to agree  the terms and conditions"
  ),
  iAgree: Yup.bool().oneOf([true], "Please accept our agreement"),
  // name: Yup.string().min(2).max(10).required("Please enter the Name"),
  confirm_password: Yup.string()
    .required("Please enter the Password again")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const quizSearch = Yup.object({
  fieldtype: Yup.number().required("Please Select a Column"),
  searchval: Yup.string().required("Please fill the search field"),
});

export const UpdateProduct = Yup.object({
  price: Yup.number()
    .min(1, "Bonus must be entered       as a positive value")
    .typeError("Bonus must be a number")
    .required("Please fill out this field."),
});

export const addProductSchema = Yup.object({
  productName: Yup.string().required("Please fill out this field."),
  bonus: Yup.number()
    .required("Please fill out this field.")
    .min(1, "Bonus must be enter as a positive value")
    .typeError("Bonus must be a number"),
  sku: Yup.string().required("Please fill out this field."),
});
export const addRetailerSchema = Yup.object({
  productName: Yup.string().required("Please fill out this field."),
});


export const addNewsletterVal = Yup.object({
  subject: Yup.string().required("Please fill the Subject"),
});
