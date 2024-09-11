import React, { useState, useEffect } from 'react';

const CardAttachmentComponent = ({ cardId }) => {
  const [attachment, setAttachment] = useState(null);
  const [attachmentsList, setAttachmentsList] = useState([]);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleAddAttachment = () => {
    if (!attachment) {
      return;
    }

    const formData = new FormData();
    formData.append('cardId', cardId);
    formData.append('attachment', attachment);

    fetch('/api/v1/card-attachments/add', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAttachmentsList([...attachmentsList, data]);
        // Xử lý sau khi thêm attachment thành công
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  };

  const handleUpdateAttachment = (attachmentId) => {
    fetch(`/api/v1/card-attachments/update?cardId=${cardId}&attachmentId=${attachmentId}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Attachment updated successfully');
          // Xử lý sau khi cập nhật attachment thành công
        } else if (response.status === 404) {
          console.log('Attachment not found');
          // Xử lý khi không tìm thấy attachment
        } else {
          console.log('Error updating attachment');
          // Xử lý khi có lỗi
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  };

  const handleDeleteAttachment = (attachmentId) => {
    fetch(`/api/v1/card-attachments/delete?cardId=${cardId}&attachmentId=${attachmentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Attachment deleted successfully');
          setAttachmentsList(attachmentsList.filter((attachment) => attachment.id !== attachmentId));
          // Xử lý sau khi xóa attachment thành công
        } else if (response.status === 404) {
          console.log('Attachment not found');
          // Xử lý khi không tìm thấy attachment
        } else {
          console.log('Error deleting attachment');
          // Xử lý khi có lỗi
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  };

  useEffect(() => {
    fetch(`/api/v1/card-attachments?cardId=${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setAttachmentsList(data);
        // Xử lý sau khi lấy danh sách tệp đính kèm
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  }, [cardId]);

  return (
    <div>
      <label>
        Attachment:
        <input type="file" onChange={handleAttachmentChange} />
      </label>
      <button onClick={handleAddAttachment}>Add Attachment</button>

      <ul>
        {attachmentsList.map((attachment) => (
          <li key={attachment.id}>
            {attachment.name}
            <button onClick={() => handleUpdateAttachment(attachment.id)}>Update</button>
            <button onClick={() => handleDeleteAttachment(attachment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardAttachmentComponent;
