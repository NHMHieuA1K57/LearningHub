import { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';

function EditableDiv(props) {

  const [parameter, setParameter] = useState(props.param);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [show, setShow] = useState(false);
  const editTitleRef = useRef(null);
  const editContentRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    fetchData(parameter); // Gọi API khi giá trị tham số thay đổi
  }, [parameter]);

  //Giải quyết sự kiến ấn vào nút cancel
  const handleCancelClick = (event) => {

    fetchData(parameter);
    setShow(false);
  };

  //Hàm gọi api,lấy dữ liệu của 1 note
  async function fetchData(parameter) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/note?id=${parameter}`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      editTitleRef.current.innerText = data.data.title;
      editContentRef.current.innerText = data.data.description;
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  //Giải quyết sự kiến ấn vào nút save
  const handleSaveClick = (event) => {
    const editedTitle = sanitizeInput(editTitleRef.current.innerText);
    const editedContent = sanitizeInput(editContentRef.current.innerText);

    const postData = {
      // Đối tượng bạn muốn truyền trong phần body
      id: parameter,
      title: editedTitle,
      description: editedContent,
    };

    fetchSaveData(postData); // Gọi API và truyền đối tượng trong phần body
    setTitle(editedTitle);
    setContent(editedContent);
    setShow(false);
  };

  //Hàm gọi api,cập nhật lại dữ liệu cả 1 note
  async function fetchSaveData(postData) {
    try {
      const response = await fetch('http://localhost:8080/api/v1/note', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });
      const data = await response.json();
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  //hàm check dữ liệu đầu vào
  const sanitizeInput = (input) => {
    // Loại bỏ các thẻ HTML và ký tự đặc biệt không mong muốn
    const sanitizedText = input.replace(/<[^>]+>/g, '');
    return sanitizedText;
  };

  //click ngoài phần tử muốn edit,tự động tắt nút save,cancel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div
      ref={divRef}
      style={{ width: "100%" }}
    >
      <Typography
        variant='h4' gutterBottom
        onClick={() => setShow(true)}
        contentEditable={true}
        ref={editTitleRef}
        style={{ wordWrap: 'break-word', width: 500, padding: '5px', fontSize: 40, margin: 0, fontWeight: 'bold' }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Typography gutterBottom
        onClick={() => setShow(true)}
        contentEditable={true}
        ref={editContentRef}
        style={{ wordWrap: 'break-word', padding: '5px', fontSize: 20, color: '#8E8EAB' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {show && (
        <Stack direction='row' spacing={1}>
          <Button variant='contained' onClick={handleSaveClick}>Save</Button>
          <Button variant='contained' onClick={handleCancelClick}>Cancel</Button>
        </Stack>
      )}
    </div>
  );
}

export default EditableDiv;
