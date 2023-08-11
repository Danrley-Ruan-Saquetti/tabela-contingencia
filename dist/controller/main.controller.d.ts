declare function MainControl(): {
    prepareForDownload: (name: string | undefined, files: {
        file: any;
        name: string;
    }[]) => void;
};
