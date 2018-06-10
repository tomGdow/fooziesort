g/^$/d
%s/</\&lt;/g
%s/>/\&gt;/g
%s/^/\=printf("<a href\=\"gitcommands.html#%-d\"><span class=\"vimlnum\">%d<\/span>", line('.'), line('.')) 
%s/\\/\\\\/g
%s/\[/\\\[/g
%s/\]/\\\]/g
%s/"/\\"/g
normal gg VG

" finall run as ex command normal @a and rrecord the
" following to the a-regiser: yss"<esc>$a<esc>,
