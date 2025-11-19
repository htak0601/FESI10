// src/components/SignupForm.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";
import { SignupForm } from ".";

test("이메일, 비밀번호, 확인 비밀번호 입력 후 제출 이벤트 테스트", async () => {
  render(<SignupForm />);

  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 이메일 입력 필드 확인
  const emailInput = screen.getByLabelText("이메일");
  // emailInput.click(); // 클릭해도 focus는 안됨
  // 이메일 필드에 포커스하기
  emailInput.focus();
  // 이메일 필드에 포커스되어 있는지 확인
  expect(emailInput).toHaveFocus();
  // 이메일 입력
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.keyDown(emailInput, { key: "Tab", code: "Tab" });

  // 비밀번호 입력 필드 확인
  const passwordInput = screen.getByLabelText("비밀번호");
  // 비밀번호 필드에 포커스하기
  passwordInput.focus();
  // 비밀번호 필드에 포커스되어 있는지 확인
  expect(passwordInput).toHaveFocus();
  // 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.keyDown(passwordInput, { key: "Tab", code: "Tab" });

  // 확인 비밀번호 입력 필드 확인
  const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");
  // 확인 비밀번호 필드에 포커스하기
  confirmPasswordInput.focus();
  // 확인 비밀번호 필드에 포커스되어 있는지 확인
  expect(confirmPasswordInput).toHaveFocus();
  // 확인 비밀번호 입력
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  // Tab 키를 눌러 제출 버튼으로 이동
  fireEvent.keyDown(confirmPasswordInput, { key: "Tab", code: "Tab" });

  // 제출 이벤트 발생
  const signupButton = screen.getByRole("button", { name: "회원가입" });
  signupButton.focus();
  expect(signupButton).toHaveFocus();

  fireEvent.keyDown(signupButton, { key: "Enter", code: "Enter" });
  fireEvent.click(signupButton);

  // 콘솔 로그 확인
  expect(alertSpy).toHaveBeenCalledWith("test@example.com님 반갑습니다.");

  // jest.spyOn()으로 생성된 스파이(spy)를 원래 구현(original implementation)으로 완전히 복원하는 역할
  alertSpy.mockRestore();
});
