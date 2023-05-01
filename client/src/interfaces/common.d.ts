export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    articles: Array | undefined
}

export interface ArticleProps {
    _id: string,
    title: string,
    description: string,
    // location: string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string;
    register: UseFormRegister<FieldValues>;
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
    formLoading: boolean;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    onFinishHandler: (data: FieldValues) => Promise<void>;
    handleImageChange?: (file: File) => void; // Make this optional with a '?'
    articleImage?: { name: string; url: string }; // Make this optional with a '?'
  }
  export interface BaseFormProps<T> {
    type: string; // <-- Add this line
    handleSubmit: (data: T) => Promise<void>;
    formLoading: boolean;
    onFinishHandler: () => void;
  }
  

