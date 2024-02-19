import * as yup from "yup";
yup.addMethod(yup.mixed, "fileSize", function (maxSize, message) {
  return this.test("fileSize", message, function (value) {
    const { path, createError } = this;

    if (value && value.size > maxSize) {
      return createError({
        path,
        message,
      });
    }
    return true;
  });
});

const userSchema = yup.object().shape({
  name: yup.string().required().min(3).max(25),
  image: yup
    .mixed()
    .required("A File is Required")
    .fileSize(2024 * 2024, "File size must be less than 1MB"),
});

export { userSchema };
