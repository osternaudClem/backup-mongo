import colors from "colors";

const info = (message: string) => {
  console.log(colors.cyan(message));
};

const success = (message: string) => {
  console.log(colors.green(message));
};

const error = (message: string, error?: any) => {
  console.error(colors.red(message), error);
};

export default { success, error, info };
