import { useState, useRef } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CustomButton from './Button';

type UploadPhotoProps = {
    label: string;
    value?: string;
};

const UploadPhoto = ({ label, value }: UploadPhotoProps) => {
    const [fileBase64, setFileBase64] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function convertFile(files: FileList | null) {
        if (files && files.length > 0) {
            const fileRef = files[0];
            const fileType: string = fileRef.type || '';
            const reader = new FileReader();
            reader.readAsBinaryString(fileRef);
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                if (ev.target) {
                    setFileBase64(
                        `data:${fileType};base64,${btoa(ev.target.result as string)}`,
                    );
                    console.log(
                        `data:${fileType};base64,${btoa(ev.target.result as string)}`,
                    );
                }
            };
            setSelectedFile(fileRef); // Store the selected file
        }
    }

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="#ffffff"
                borderRadius="md"
                w="full"
                h="full"
            >
                {fileBase64 ? (
                    <>
                        {fileBase64.indexOf('image/') > -1 && (
                            <img src={fileBase64} width={300} alt=""/>
                        )}
                    </>
                ) : (
                    <Flex
                        flexDirection="column"
                        p="4"
                        w="full"
                        h="full"
                        bg="#c8c8c8"
                        color="#ffffff"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        <Icon as={FiPlus} boxSize={8} />
                        <Text mt="2">{label}</Text>
                    </Flex>
                )}
            </Flex>
            <Flex mt="4">
                {fileBase64 ? (
                    <CustomButton onClick={() => fileInputRef.current?.click()}>
                        Change Photo
                    </CustomButton>
                ) : (
                    <CustomButton onClick={() => fileInputRef.current?.click()}>
                        Upload Photo
                    </CustomButton>
                )}
            </Flex>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => convertFile(e.target.files)}
                value={value}
            />
        </Flex>
    );
};

export default UploadPhoto;
