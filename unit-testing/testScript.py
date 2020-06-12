import subprocess

code = "testCode.c"

print("C code running")

subprocess.call(["gcc", code])
subprocess.call("./a.out")
