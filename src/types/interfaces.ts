export interface Input {
  keyName: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
}

export interface FormProps<T> {
  inputs: Array<Input>;
  formBtn: string;
  dataHandle: (data: T ) => void;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData extends SigninData {
  first_name: string;
  last_name: string;
  user_name: string;
  password_confirmation: string;
  profile_image: File;
}

export interface UserInfo {
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  profile_image_url: string;
}

export interface Product{
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AddProduct{
  name: string;
  price: string;
  image: File | null;
}

export interface ProductProps{
  title: string;
  product?: Product
}

export interface ProductCardProps{
  product: Product;
  handleDelete: (id: number) => void;
}

export interface ProductItem{
  name: string | undefined;
  price: string | undefined;
  image: string | undefined;
}

export interface AddEditFormProps{
  inputs: Array<Input>;
  dataHandle: (data: AddProduct) => void;
}

export interface ProductDetail{
  name: string| undefined;
  value: string | undefined;
}