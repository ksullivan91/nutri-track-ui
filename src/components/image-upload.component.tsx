import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { StyledH4 } from './content-typography.component';

const Section = styled.section`
  margin: 32px 0;
`;

const Container = styled.div<{
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const PreviewImage = styled.img`
  width: auto;
  height: 64px;
  border-radius: 4px;
`;

const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

interface OwnProps {
  setFile: (file: File) => void;
}

const ImageUpload: React.FC<OwnProps> = (props) => {
  const {
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    onDropAccepted: (files) => {
      props.setFile(files[0]);
    },
  });

  const files = acceptedFiles.map((file) => (
    <StyledListItem key={file.name}>
      <PreviewImage src={URL.createObjectURL(file)} alt={file.name} />
    </StyledListItem>
  ));

  return (
    <Section className='container'>
      <div className='container'>
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} disabled={acceptedFiles.length > 0} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Container>
      </div>
      {files.length > 0 && (
        <aside>
          <StyledH4>Image</StyledH4>
          <StyledUnorderedList>{files}</StyledUnorderedList>
        </aside>
      )}
    </Section>
  );
};

export default ImageUpload;
