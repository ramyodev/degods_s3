import os

def list_files_without_extension():
    # List all files in the current directory
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    
    # Remove file extensions
    filenames_without_extension = [os.path.splitext(f)[0] for f in files]
    
    # Convert to JavaScript list format
    js_list = str(filenames_without_extension).replace("'", '"')
    
    print(f"{js_list};")

if __name__ == "__main__":
    list_files_without_extension()