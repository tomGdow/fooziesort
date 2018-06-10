g/^$/d
%s/</\&lt;/g
%s/>/\&gt;/g
%s/^/\=printf("<p id\=\"%-d\"><span class=\"lnum\">%-d<\/span>", line('.'), line('.'))
"then gg VG and execute 'normal @b' as ex command
"where contents of  b reg is $a</p><esc>
