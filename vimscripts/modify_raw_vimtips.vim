g/^$/d
%s/^/\=printf("<a href\=\"vimtips.html#%-d\"><span class=\"vimlnum\" data-tooltip-lnum=\"line number\">%d<\/span>", line('.'), line('.')) 
%s/\\/\\\\/g
%s/\[/\\\[/g
%s/\]/\\\]/g
%s/"/\\"/g
normal gg VG

" finall run as ex command normal @a and rrecord the
" following to the a-regiser: yss"<esc>$a<esc>,
