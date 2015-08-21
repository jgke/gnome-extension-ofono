AC_PREREQ(2.63)
AC_INIT([gnome-extension-ofono],[0.1],[https://github.com/jgke/gnome-extension-ofono])

AC_CONFIG_MACRO_DIR([m4])
AC_CONFIG_AUX_DIR([config])

AM_INIT_AUTOMAKE([1.10 dist-bzip2 no-dist-gzip foreign tar-ustar])

AC_PROG_SED

IT_PROG_INTLTOOL([0.40.1])

GETTEXT_PACKAGE=gnome-extension-ofono
AC_SUBST(GETTEXT_PACKAGE)
AC_DEFINE_UNQUOTED(GETTEXT_PACKAGE, "$GETTEXT_PACKAGE",
                   [The prefix for our gettext translation domains.])

UUID=[gnome-extension-ofono@jaakko.hannikainen.intel.com]
AC_SUBST(UUID)

m4_ifdef([AM_SILENT_RULES],[AM_SILENT_RULES([yes])])

PKG_PROG_PKG_CONFIG([0.22])

AC_CONFIG_FILES([
  Makefile
  po/Makefile.in
  src/Makefile
])
AC_OUTPUT

dnl XXX: Is there any other way to set the locale directory?
extensiontopdir=${datadir}/gnome-shell/extensions/${UUID}
${SED} -i -e "s%itlocaledir = .*%itlocaledir = ${extensiontopdir}/locale%g" po/Makefile
