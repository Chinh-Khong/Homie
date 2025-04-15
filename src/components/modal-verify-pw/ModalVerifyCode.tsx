'use client';

import { Modal, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; 

interface VerifyCodeProps {
  isShowVerifyCode: boolean;
  setIsShowVerifyCode: (isShow: boolean) => void;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
}

const ModalVerifyCode: React.FC<VerifyCodeProps> = ({
  isShowVerifyCode,
  setIsShowVerifyCode,
  setIsShowSetPassword,
  setIsShowLogin
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsShowVerifyCode(false);
  };

  const handleSubmit = (values: { code: string }) => {
    console.log("Verification code submitted:", values.code);
    setIsShowVerifyCode(false);
    setIsShowSetPassword(true);
  };

  const handleResendCode = () => {
    console.log("Resending verification code");
  };

  const switchToLogin = () => {
    setIsShowVerifyCode(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowVerifyCode}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <button
        onClick={switchToLogin}
        className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors gap-2 cursor-pointer"
      >
        <span className="mr-1"><ArrowLeftOutlined /></span> Back to login
      </button>

      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Verify code</h2>
        <p className="text-gray-500 text-lg">An authentication code has been sent to your email</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Enter Code <span className="text-red-500">*</span></span>}
          name="code"
          rules={[
            { required: true, message: 'Please input the verification code!' },
            { min: 6, message: 'Code must be 6 characters!' },
            { max: 6, message: 'Code must be 6 characters!' }
          ]}
        >
          <Input
            placeholder="Enter code here"
            className="h-[50px] text-lg text-left font-mono"
          />
        </Form.Item>

        <div className="pb-3 flex flex-row justify-center font-semibold cursor-pointer text-[16px]">
          Didn't receive a code?{' '}
          <span
            onClick={handleResendCode}
            className="text-main text-rose-500 hover:text-rose-700 hover:text-main-dark ml-1"
          >
            Resend
          </span>
        </div>

        <Form.Item>
          <button
            type="submit"
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main-dark rounded-xl text-center cursor-pointer transition-colors"
          >
            Verify
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVerifyCode;