import * as Yup from "yup";
import parse from "date-fns/parse";

export const contactSchema = Yup.object({
  subject: Yup.string().min(2).required("Please enter the Subject"),
  name: Yup.string().min(2).required("Please enter the Name"),
  phone: Yup.number().required("Please enter the Phone"),
  email: Yup.string().min(2).required("Please enter the Email"),
  contactback: Yup.string().min(2).required("Please select the type"),
  question: Yup.string().min(2).required("Please enter the Question"),

  // name: Yup.string().min(2).max(10).required("Please enter the Name"),
  // confirm_password: Yup.string()
  // .required("Please enter the password again")
  // .oneOf([Yup.ref('password'),null],"Password must match")
});

export const signInSchema = Yup.object({
  username: Yup.string().min(2).required("Please enter the Username"),
  password: Yup.string().min(2).required("Please enter the Password"),
  // name: Yup.string().min(2).max(10).required("Please enter the Name"),
  // confirm_password: Yup.string()
  // .required("Please enter the password again")
  // .oneOf([Yup.ref('password'),null],"Password must match")
});

export const signUpSchema = Yup.object({
  username: Yup.string().min(2).required("Please enter the Username"),
  fname: Yup.string().min(2).required("Please enter the First Name"),
  lname: Yup.string().min(2).required("Please enter the Last Name"),
  zipcode: Yup.string().min(4).required("Please enter the Zip Code"),
  stateprov: Yup.number().required("Please select the State"),
  city: Yup.number().required("Please select the City"),
  store: Yup.number().required("Please select the Store"),
  stateprov2: Yup.number().required("Please enter the State"),
  city2: Yup.number().required("Please enter the City"),
  role: Yup.number().required("Please select the Role"),
  manager_signature: Yup.string()
    .notRequired()
    .when("role", {
      is: (val) => val === 1,
      then: Yup.string().required("Please enter the Signature"),
      otherwise: Yup.string().notRequired(),
    }),
  signature: Yup.string().min(2).required("Please enter the Signature"),
  email: Yup.string().email().required("Please enter the Email"),
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
  // name: Yup.string().min(2).max(10).required("Please enter the Name"),
  confirm_password: Yup.string()
    .required("Please enter the Password again")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
export const checkBoxSchema = Yup.object({
  checkBoxAns: Yup.array()
    .min(1, "Must select atleast one answer")
    .of(Yup.string().required())
    .required(),
});

export const forgotPassword = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Please enter the Email"),
});

export const changePassword = Yup.object({
  password: Yup.string()
    .min(6, "Your password must be at least 6 characters long")
    .required("Please enter the Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
    ),
  confirm_password: Yup.string()
    .required("Please enter the password again")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

// FIXME image validation not working
export const submitUserSchema = Yup.object({
  retailer: Yup.number().required("Please select retailer"),

  product: Yup.number().required("Please select product you sold"),
  size: Yup.number().required("Please select product size"),
  invoice: Yup.string().min(2).required("Please enter delivered invoice"),
  invoice_date: Yup.string().required("Please select date"),
  quantity: Yup.number().required("Please select shipped quantity"),
  image: Yup.mixed().required("Please upload an file"),

  // FIXME all fields depend on product field, if product field is empty then what?
  product2: Yup.number(),
  size2: Yup.number().when("product2", {
    is: (product2) => product2,
    then: Yup.number().required("Please select product size"),
    otherwise: Yup.number(),
  }),
  invoice2: Yup.string()
    .min(2)
    .when("product2", {
      is: (product2) => product2,
      then: Yup.string().required("Please enter delivered invoice"),
      otherwise: Yup.string().min(2),
    }),
  invoice_date2: Yup.string()
    .min(2)
    .when("product2", {
      is: (product2) => product2,
      then: Yup.string().required("Please select date"),
      otherwise: Yup.string().min(2),
    }),
  quantity2: Yup.number().when("product2", {
    is: (product2) => product2,
    then: Yup.number().required("Please select shipped quantity"),
    otherwise: Yup.number(),
  }),
  image2: Yup.mixed().when("product2", {
    is: (product2) => product2,
    then: Yup.mixed().required("Please upload an image"),
    otherwise: Yup.mixed(),
  }),

  // FIXME all fields depend on product field, if product field is empty then what?
  product3: Yup.number(),
  size3: Yup.number().when("product3", {
    is: (product3) => product3,
    then: Yup.number().required("Please select product size"),
    otherwise: Yup.number(),
  }),
  invoice3: Yup.string()
    .min(2)
    .when("product3", {
      is: (product3) => product3,
      then: Yup.string().required("Please enter delivered invoice"),
      otherwise: Yup.string().min(2),
    }),
  invoice_date3: Yup.string()
    .min(2)
    .when("product3", {
      is: (product3) => product3,
      then: Yup.string().required("Please select date"),
      otherwise: Yup.string().min(2),
    }),
  quantity3: Yup.number().when("product3", {
    is: (product3) => product3,
    then: Yup.number().required("Please select shipped quantity"),
    otherwise: Yup.number(),
  }),
  image3: Yup.mixed().when("product3", {
    is: (product3) => product3,
    then: Yup.mixed().required("Please upload an image"),
    otherwise: Yup.mixed(),
  }),

  // split1: Yup.bool().oneOf([true], "You need to agree  the split1"),
  // split2: Yup.bool().oneOf([true], "You need to agree  the split2"),
  // split3: Yup.bool().oneOf([true], "You need to agree  the split3"),
});

const phoneRegExp = /^([0-9]{10})$/gm;
export const updateUserSchema = Yup.object({
  fname: Yup.string()
    .min(2, "First Name must be at least 2 characters long.")
    .required("Please enter the First Name"),
  lname: Yup.string()
    .min(2, "Last Name must be at least 2 characters long.")
    .required("Please enter the Last Name"),
  zipcode: Yup.string()
    .min(5, "The Zip Code must be at least 5 characters long.")
    .max(9, "The Zip Code must not be greater than 9 characters.")
    .required("Please enter the Zip Code"),
  stateprov2: Yup.number().required("Please enter the State"),
  retailer: Yup.number().required("Please enter the Retailer"),
  address1: Yup.string().required("Please enter the Address1"),
  city2: Yup.number().required("Please enter the City"),
  address1: Yup.string()
    .min(2, "The Address 1 must be at least 2 characters long.")
    .required("Please enter the Address1"),
  phone: Yup.string()
    .required("Please enter the Phone")
    .matches(phoneRegExp, "Please enter at least 10 digits."),

  email: Yup.string()
    .email("Email must be a valid email.")
    .required("Please enter the Email"),
  // password: Yup.string().when({
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

  // confirm_password: Yup.string()
  //   .when("password", {
  //     is: (password) => password,
  //     then: Yup.string().required("Please enter the Password again"),
  //     otherwise: Yup.string().notRequired(),
  //   })
  //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const quizSearch = Yup.object({
  fieldtype: Yup.number().required("Please Select a Column"),
  searchval: Yup.string().required("Please fill the search field"),
});
export const montlySales = Yup.object({
  sales: Yup.string().required("Please fill the Table Name"),
  date: Yup.date().required("Please select date"),
  start: Yup.date().required("Please select start date"),
  end: Yup.date().required("Please select end date"),
});
export const exportdata = Yup.object({
  fieldtype: Yup.number().required("Please Select a Column"),
  date: Yup.date().required("Please select date"),
  start: Yup.date().required("Please select start date"),
  end: Yup.date().required("Please select end date"),
});

export const updateStoreSchema = Yup.object({
  stateprov: Yup.number().required("Please enter the State"),
  city: Yup.number().required("Please enter the City"),
  store: Yup.number().required("Please enter the Store"),
});

// admin schema here

export const UpAdminSchema = Yup.object({
  fname: Yup.string().min(2).required("Please enter the First Name"),
  lname: Yup.string().min(2).required("Please enter the Last Name"),
  zipcode: Yup.string().min(4).required("Please enter the Zip Code"),
  state: Yup.string().required("Please enter the State"),
  city: Yup.string().required("Please enter the City"),
  address: Yup.string().required("Please enter the City"),
  email: Yup.string().email().required("Please enter the Email"),
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

export const courseIntro = Yup.object({
  title: Yup.string().required("Please fill the Course Title"),
  question: Yup.number().min(1).required("Please enter the Question Number"),
});
