import { fireEvent, render } from "@testing-library/react";
import Button from "../Button";
import { useSession, signIn, signOut } from "next-auth/react";
jest.mock("next-auth/react");
global.window.open = jest.fn();

describe("signed out", () => {
  beforeAll(() => {
    (useSession as jest.Mock).mockReturnValue({ data: {} });
  });

  it("renders signed in button", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it("calls sign in when clicked", () => {
    const { getByText } = render(<Button />);
    fireEvent.click(getByText("Sign In"));
    expect(global.window.open).toHaveBeenCalledTimes(1);
    expect(global.window.open).toHaveBeenCalledWith(
      "/google-signin",
      expect.anything(),
      expect.anything()
    );
  });

  afterAll(() => {
    (useSession as jest.Mock).mockReset();
  });
});

describe("signed in", () => {
  beforeAll(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "John",
        },
      },
    });
  });
  it("renders singed out button", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it("calls sign out when clicked", () => {
    const { getByText } = render(<Button />);
    fireEvent.click(getByText("Sign Out"));
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    (useSession as jest.Mock).mockReset();
  });
});
