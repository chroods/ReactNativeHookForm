import {
    Input as NativeBaseInput, 
    IInputProps,
    FormControl
} from 'native-base'

type Props = IInputProps &{
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid ,...rest}: Props){
    const invalid = !!errorMessage || isInvalid;
    
    return(
        <FormControl mb={4} isInvalid={invalid}>
            <NativeBaseInput
                bg="gray.200"
                fontSize="md"
                h={16}
                isInvalid={invalid}
                placeholderTextColor="gray.500"
                borderRadius={10}
                _focus={{
                    bg: "gray.400",
                    borderWidth: 1,
                    borderColor: "green.500"
                }}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}