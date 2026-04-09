import Button from "../button";

export function LoginForm() {
  return (
    <>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <Button>Log In</Button>
    </>
  );
}

export function SignupForm() {
  return (
    <>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <Button>Create Account</Button>
    </>
  );
}
export function UserProfile() {
  return (
    <>
      <img src="../../../assets/icons/book.svg"></img>
    </>
  );
}
