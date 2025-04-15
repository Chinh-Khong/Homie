'use client';

import { Modal, Form, Input } from "antd";

interface SetPasswordProps {
  isShowSetPassword: boolean;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
}

const ModalSetPassword: React.FC<SetPasswordProps> = ({
  isShowSetPassword,
  setIsShowSetPassword,
  setIsShowLogin
}) => {
  const handleCancel = () => {
    setIsShowSetPassword(false);
  };

  const handleSubmit = (values: { password: string; confirmPassword: string }) => {
    console.log("New password set:", values.password);
    setIsShowSetPassword(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowSetPassword}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Set a password</h2>
        <p className="text-gray-500 text-lg">Your previous password has been reset. Please set a new password</p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Create Password <span className="text-red-500">*</span></span>}
          name="password"
          rules={[
            { required: true, message: 'Please create a password!' },
            { min: 8, message: 'Password must be at least 8 characters!' }
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-lg">Confirm Password <span className="text-red-500">*</span></span>}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main-dark rounded-xl text-center cursor-pointer transition-colors"
          >
            Set Password
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSetPassword;