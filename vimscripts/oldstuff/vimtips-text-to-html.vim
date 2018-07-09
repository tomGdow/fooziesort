let @b='$a</span></p>'
g/^$/d
%s/</\&lt;/g
%s/>/\&gt;/g
%s/'/\&#39;/g
%s/^/\=printf( "<p> <span class=\"lnum-hmtl\">%-d<\/span><span id\=\"%-d\" class=\"all-copy-vimhtml\" data-tooltip-pdfpath=\"click-to-copy\">", line('.'), line('.'))
"then gg VG and execute 'normal @b' as ex command
"where contents of  b reg is $a</p><esc>
