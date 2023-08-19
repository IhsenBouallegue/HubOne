import {
  Button,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck, IconSend } from "@tabler/icons-react";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = (values: FormValues) => {
    fetch("/api/contact", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response: { status: number }) => {
        if (response.status === 200) {
          showNotification({
            icon: <IconCheck />,
            title: "Message Sent 😍",
            message: "We will reply as soon as possible!",
          });
          form.reset();
        } else {
          showNotification({
            icon: <IconAlertTriangle />,
            title: "Message was not Sent ☹️",
            message:
              "No worries, Here is my personal email bouallegueihsen@gmail.com!",
          });
        }
      })
      .catch(() => {
        showNotification({
          icon: <IconAlertTriangle />,
          title: "Message was not Sent ☹️",
          message:
            "No worries, Here is my personal email bouallegueihsen@gmail.com!",
        });
      });
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="xl" mb="3em">
        <TextInput
          required
          placeholder="Your name"
          label="Name"
          withAsterisk
          styles={{ label: { marginBottom: 12 } }}
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          placeholder="Your Email"
          label="Email"
          withAsterisk
          styles={{ label: { marginBottom: 12 } }}
          {...form.getInputProps("email")}
        />
        <Select
          required
          label="Why are you writing?"
          placeholder="Pick one"
          withAsterisk
          data={[
            { value: "Say Hi", label: "Give Feedback" },
            { value: "Have a Question", label: "Ask a Question" },
            { value: "Request an Instance", label: "Take Part in the Alpha" },
            { value: "Other", label: "Something Else" },
          ]}
          styles={{ label: { marginBottom: 12 } }}
          {...form.getInputProps("subject")}
        />
        <Textarea
          required
          placeholder="Your Message"
          label="Message"
          autosize
          minRows={4}
          withAsterisk
          styles={{ label: { marginBottom: 12 } }}
          {...form.getInputProps("message")}
        />
      </Stack>
      <Group position="center" mt="md">
        <Button
          leftIcon={<IconSend size={14} />}
          type="submit"
          size="md"
          variant="light"
          color="primary.4"
          fullWidth
        >
          Send
        </Button>
      </Group>
    </form>
  );
}
