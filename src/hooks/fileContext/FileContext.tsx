import React, { createContext, useContext, useState } from 'react';

export interface FileState {
    originalFile: File | null;
    cropFile: File | null;
    filterFile: File | null;
    urlOriginalFile:string;
    urlCropFile:string;
    urlFilterFile:string
    showPopUpForPost:boolean
    showNotificationForPost:boolean
}


const initialFileState: FileState = {
    originalFile: null,
    cropFile: null,
    filterFile: null,
    urlOriginalFile:'',
    urlCropFile:'',
    urlFilterFile:'',
    showPopUpForPost:false,
    showNotificationForPost:false
};

const FileContext = createContext<[FileState, React.Dispatch<React.SetStateAction<FileState>>] | undefined>(undefined);

export const FileProvider: React.FC = ({ children }) => {
    const state = useState<FileState>(initialFileState);
    return <FileContext.Provider value={state}>{children}</FileContext.Provider>;
};

export const useFile = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFile must be used within a FileProvider');
    }
    return context;
};