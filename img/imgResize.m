clc; 
clear all;
file_read=dir('F:\tzpRepository\H5GameAPP\img\game\*.jpg');%读取文件夹abc的位置
filenames={file_read.name}';
file_length=length(file_read);
file_length
for i=1:file_length
    iname = ['F:\tzpRepository\H5GameAPP\img\game\' file_read(i).name];
    rename = ['F:\tzpRepository\H5GameAPP\img\game\s\' file_read(i).name];
    tImg = imread(iname);
   %[width, height] =  size(tImg);
    reImg = imresize(tImg, 0.7);
    imwrite(reImg, rename);
end
