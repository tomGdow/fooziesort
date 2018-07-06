let @a='yss"$a,'
g/^$/d
%s/^/\=printf("<span  class=\"vimlnum\" data-tooltip-lnum=\"lnum\">%d<\/span><span id=\"%d\" class=\"all-copy\" data-tooltip-pdfpath=\"click to copy\" >", line('.'), line('.'))
%s/$/<\/span>
%s/\\/\\\\/g
%s/"/\\"/g
normal gg VG

" finall run as ex command normal @a and rrecord the
" following to the a-regiser: yss"<esc>$a<esc>,
