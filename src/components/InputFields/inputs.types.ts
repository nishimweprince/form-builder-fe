import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export default interface inputFieldsProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;

}

export interface TextareaFieldsProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
}

export interface selectFieldsProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    options: {value: string; label: string}[]
}
