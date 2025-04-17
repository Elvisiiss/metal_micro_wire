import os

def generate_directory_structure():
    # 获取当前脚本所在目录作为根目录
    current_dir = os.path.abspath(os.path.dirname(__file__))
    root_name = os.path.basename(current_dir)
    
    # 创建统计文件夹
    stats_dir = os.path.join(current_dir, '统计')
    os.makedirs(stats_dir, exist_ok=True)
    
    output_lines = [f"{root_name}\\"]
    
    def traverse_directory(path, depth):
        try:
            entries = []
            for entry in os.listdir(path):
                full_path = os.path.join(path, entry)
                if os.path.isdir(full_path):
                    entries.append((entry, True))
                else:
                    entries.append((entry, False))
            
            # 排序：目录在前，名称小写排序
            entries.sort(key=lambda x: (not x[1], x[0].lower()))
            
            for entry, is_dir in entries:
                prefix = '>' * depth
                line = f"{prefix}{entry}"
                if is_dir:
                    line += "\\"
                output_lines.append(line)
                if is_dir:
                    traverse_directory(os.path.join(path, entry), depth + 1)
        except PermissionError:
            pass
    
    traverse_directory(current_dir, 1)
    
    # 写入文件
    output_path = os.path.join(stats_dir, '目录结构.md')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))

if __name__ == "__main__":
    generate_directory_structure()