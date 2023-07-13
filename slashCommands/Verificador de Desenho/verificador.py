import sys
import ezdxf
import os
import re

doc = ezdxf.readfile(sys.argv[1])

#Verifica o nome do arquivo está separado corretamente
fileName = os.path.splitext(os.path.basename(sys.argv[1]))
fileName = fileName[0]
fileName = fileName.replace('EXECUTANDO_', '')
fileName = fileName.replace('ENTREGA_', '')
pattern = r'^[A-Z0-9]+-[A-Z0-9]+_[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+_[A-Z0-9]+$'
if re.match(pattern, fileName):
    print("O arquivo esta separado corretamente.")
else:
    print("O arquivo nao esta separado corretamente.")

#Confronta os dados do Arquivo com oq está no desenho
codigo = fileName.split('-')  # Primeira divisão usando o caractere "-"
codigo = [item.split('_') for item in codigo]  # Segunda divisão usando o caractere "_"
codigo = sum(codigo, [])  # Unir as sublistas em uma única lista