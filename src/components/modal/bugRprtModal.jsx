import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "rsuite";
import { makeRequest } from "../../axios";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const BugRprtModal = ({ open, onClose }) => {
  const [issues, setIssues] = useState();
  const [listedon, setListedOn] = useState();
  const [description, setDescription] = useState();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newIssue) => {
      return makeRequest.post("/issues", newIssue);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["issues"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ issues, listedon, description });
    setDescription("");
    setIssues("");
    setListedOn("");
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={onClose} backdrop={"static"} size="md">
        <Modal.Header>
          <Modal.Title>Report Bugs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.ControlLabel>Issue</Form.ControlLabel>
              <Form.Control
                name="issues"
                style={{ width: 400 }}
                onChange={(e) => setIssues(e)}
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.ControlLabel>Listed On</Form.ControlLabel>
              <DatePicker
                oneTap
                style={{ width: 400 }}
                name="listedon"
                onChange={(value) => setListedOn(value)}
              />
            </Form.Group>

            <Form.Group controlId="textarea">
              <Form.ControlLabel>Describe your issues</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="description"
                accepter={Textarea}
                style={{ width: 700 }}
                onChange={(e) => setDescription(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleSubmit} appearance="primary" color="green">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BugRprtModal;
