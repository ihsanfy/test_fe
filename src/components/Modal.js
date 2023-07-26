import { Form, Input, Modal } from "antd";

const ModalForm = ({show, handleSubmit, handleCancel, formData}) => {
    return (
      <>
        <Modal
          title="Form Task"
          open={show}
          onOk={handleSubmit}
          onCancel={handleCancel}
          width={1000}
          destroyOnClose={true}
        >
          <Form
            form={formData}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ margin: "0px 150px 0px 50px" }}
            labelAlign="left"
          >
            <Form.Item
              label="Nama Lengkap"
              name="namalengkap"
              rules={[
                {
                  required: true,
                  message: "Tolong masukan Nama Lengkap",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tolong Masukan Username",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Tolong Masukan Password",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Tolong Masukan Status",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  export default ModalForm