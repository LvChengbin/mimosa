if !filereadable( $HOME . '/.eslint_d' ) || syntastic#util#system( 'echo `cat ~/.eslint_d | cut -d" " -f2` $PWD | nc localhost `cat ~/.eslint_d | cut -d" " -f1`' ) is ''
    call syntastic#util#system( 'yarn eslint_d start' )
endif
let b:syntastic_typescript_eslint_exec = 'yarn'
let b:syntastic_javascript_eslint_exec = 'yarn'
let g:syntastic_javascript_eslint_command = 'echo `cat ~/.eslint_d | cut -d" " -f2` $PWD -f compact %s | nc localhost `cat ~/.eslint_d | cut -d" " -f1`'

autocmd BufNewFile *.js,*.php exec ":call SetHeadComment()"
func! SetHeadComment()
    call setline(1, "/******************************************************************")
    call setline(2, " * Copyright (C) LvChengbin. 2022-".strftime("%Y")." All Rights Reserved.")
    call setline(3, " *")
    call setline(4, " * @File: ".expand("%:p:h:t")."/".expand("%:t"))
    call setline(5, " *")
    call setline(6, " * This file is licensed under the MIT License.")
    call setline(7, " * License text available at https://opensource.org/licenses/MIT")
    call setline(8, " ******************************************************************/")
    call setline(9, "")
endfunc
